import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Check } from 'lucide-react';
import { PublicKey } from "@solana/web3.js";
import { useAuth } from "@/contexts/authContext";
import useToast from "@/hooks/useToast";

// Email string validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Solana wallet validation function
export function isValidSolanaAddress(address) {
    try {
        new PublicKey(address);
        return true;
    } catch {
        return false;
    }
}

export function CommunityCreationModal({ isOpen, onClose }) {
    const {addToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        owners_wallet: '',
        social: 'tg',
        renewal_period: '30',
        owners_email: '',
        need_wl: 'false',
        price: '1',
        plan: 'free',
        collect_wallet: ''
    });

    const [validEmail, setValidEmail] = useState(false);
    const [validWallet, setValidWallet] = useState(false);
    const [validName, setValidName] = useState(false);

    // --- Новые стейты для работы с логотипом ---
    const [logoFile, setLogoFile] = useState(null);
    const [validLogo, setValidLogo] = useState(false);

    // Если хотите, чтобы логотип тоже влиял на кнопку "Create my DAO",
    // добавьте проверку logoFile или validLogo внутри useEffect ниже.

    const [isFormValid, setIsFormValid] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const { name, price, collect_wallet, social, renewal_period, need_wl, plan, owners_email } = formData;

        // Email validation
        const good_email = isValidEmail(owners_email);
        setValidEmail(good_email);

        // Wallet validation
        const good_wallet = isValidSolanaAddress(collect_wallet);
        setValidWallet(good_wallet);

        // Community title validation
        if (name.length > 2) {
            setValidName(true);
        } else {
            setValidName(false);
        }

        // Общая валидация формы
        const isValid =
            name.trim() !== '' &&
            collect_wallet.trim() !== '' &&
            isValidSolanaAddress(collect_wallet) &&
            isValidEmail(owners_email) &&
            Number(price) > 0 &&
            social.trim() !== '' &&
            renewal_period.trim() !== '' &&
            need_wl.trim() !== '' &&
            plan.trim() !== '';
        setIsFormValid(isValid);
    }, [formData]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- Обработчик выбора файла логотипа ---
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/png') {
            setLogoFile(file);
            setValidLogo(true);
        } else {
            setLogoFile(null);
            setValidLogo(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Собираем данные для отправки
        const communityData = {
            ...formData,
            logo: `/${formData.name.toLowerCase().replace(/\s+/g, '_')}.png`,
            renewal_period: Number(formData.renewal_period),
            price: Number(formData.price),
            need_wl: formData.need_wl === 'true',
            allowed_wallets: [],
            owners_wallet: user,
            api_name: formData.name.toLowerCase().replace(/\s+/g, '_'),
        };

        // Если хотите загружать реальный файл PNG:
        // 1. Превратите communityData в FormData
        // 2. Добавьте logoFile
        // 3. Меняйте заголовки fetch запроса на multipart/form-data
        // Ниже — вариант, оставляющий JSON (без реальной загрузки изображения).

        console.log(communityData);
        try {
            const response = await fetch('http://127.0.0.1:8080/api/community/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(communityData),
            });

            if (response.ok) {
                fileUploadHandler(communityData.api_name);
                alert("Check your email to proceed");
                onClose();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fileUploadHandler = async (api_name) => {
        if (!logoFile) {
            return;
        }
        const formData = new FormData();
        formData.append('file', logoFile);
        formData.append('api_name', api_name);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            addToast(errorData, 'error');
        }

    }
    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose}
            />
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-full max-w-2xl bg-primary rounded-[2em] shadow-lg z-50 p-6 max-h-[90vh] overflow-auto text-off-white">
                <div className="flex w-full justify-between items-center mb-4">
                    <h2 className="text-2xl text-off-white font-semibold">Create Your Community</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-amber-100 hover:text-amber-200"
                    >
                        <X className="h-6 w-6 text-off-white" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Community Name */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Community Name</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="bg-secondary text-primary placeholder:text-primary/70 w-full"
                                placeholder="Enter community name"
                            />
                            {validName ? (
                                <Check className="h-6 w-6 text-[#C2E812] flex-shrink-0" />
                            ) : (
                                <X className="h-6 w-6 text-red-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Description (Optional)</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="bg-secondary text-primary placeholder:text-primary/70 w-full"
                                placeholder="Enter description"
                            />
                            <Check className="h-6 w-6 text-[#C2E812] flex-shrink-0" />
                        </div>
                    </div>

                    {/* Logo Upload (PNG only) */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Community Logo (.png)</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                type="file"
                                accept=".png"
                                onChange={handleLogoChange}
                                className={`flex pt-1.5 flex-col items-center justify-center bg-secondary
                                file:text-primary text-primary w-full ${logoFile ? "file:hidden" : "text-secondary" }`}
                            />
                            {validLogo ? (
                                <Check className="h-6 w-6 text-[#C2E812] flex-shrink-0"/>
                            ) : (
                                <X className="h-6 w-6 text-red-500 flex-shrink-0"/>
                            )}
                        </div>
                    </div>

                    {/* Collection Wallet */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Collection Wallet</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                name="collect_wallet"
                                value={formData.collect_wallet}
                                onChange={handleInputChange}
                                className="bg-secondary text-primary placeholder:text-primary/70 w-full"
                                placeholder="Enter wallet address"
                            />
                            {validWallet ? (
                                <Check className="h-6 w-6 text-[#C2E812] flex-shrink-0" />
                            ) : (
                                <X className="h-6 w-6 text-red-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>

                    {/* Social Platform */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Social Platform</Label>
                        <Select
                            value={formData.social}
                            onValueChange={(value) => handleSelectChange('social', value)}
                        >
                            <SelectTrigger className="ml-0 mr-10 bg-secondary text-primary">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="mx-0 bg-secondary text-primary">
                                <SelectItem
                                    value="tg"
                                    className="focus:text-off-white hover:text-off-white"
                                >
                                    Telegram
                                </SelectItem>
                                <SelectItem
                                    value="ds"
                                    className="focus:text-off-white hover:text-off-white"
                                >
                                    Discord
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Renewal Period */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Renewal Period (Days)</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                name="renewal_period"
                                type="number"
                                value={formData.renewal_period}
                                onChange={handleInputChange}
                                className="bg-secondary text-primary placeholder:text-primary/70 w-full"
                            />
                            {formData.renewal_period > 1 && Number.isInteger(Number(formData.renewal_period)) ?
                                (<Check className="h-6 w-6 text-[#C2E812] flex-shrink-0" />) :
                            <X className="h-6 w-6 text-red-500 flex-shrink-0" />}

                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Price (USD)</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="bg-secondary text-primary placeholder:text-primary/70 w-full"
                            />
                            {Number(formData.price) >= 0 && formData.price ?
                                (<Check className="h-6 w-6 text-[#C2E812] flex-shrink-0" />) :
                                <X className="h-6 w-6 text-red-500 flex-shrink-0" />}
                        </div>
                    </div>

                    {/* Whitelist Required */}
                    <div className="space-y-2 w-full">
                        <Label className="text-lg text-off-white">
                            Whitelist Required
                        </Label>
                            <Select
                                value={formData.need_wl}
                                onValueChange={(value) => handleSelectChange('need_wl', value)}
                            >
                                <SelectTrigger className="w-full mx-0 bg-secondary text-primary">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="mx-0 bg-secondary text-primary">
                                    <SelectItem
                                        value="true"
                                        className="focus:text-off-white hover:text-off-white"
                                    >
                                        Yes
                                    </SelectItem>
                                    <SelectItem
                                        value="false"
                                        className="focus:text-off-white hover:text-off-white"
                                    >
                                        No
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                    </div>

                    {/* Subscription Plan */}
                    <div className="space-y-2 w-full">
                        <Label className="text-lg text-off-white">Subscription Plan</Label>
                        <Select
                            value={formData.plan}
                            onValueChange={(value) => handleSelectChange('plan', value)}
                        >
                            <SelectTrigger className="w-full mx-0 bg-secondary text-primary">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="mx-0 bg-secondary text-primary">
                                <SelectItem
                                    value="free"
                                    className="focus:text-off-white hover:text-off-white"
                                >
                                    Free Creation + 10% fee
                                </SelectItem>
                                <SelectItem
                                    value="paid"
                                    className="focus:text-off-white hover:text-off-white"
                                >
                                    Paid Creation (100$) + 5% fee
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <Label className="text-lg text-off-white">Email Address</Label>
                        <div className="flex items-center gap-2 w-full">
                            <Input
                                name="owners_email"
                                type="email"
                                value={formData.owners_email}
                                required={true}
                                onChange={handleInputChange}
                                className="bg-secondary text-primary placeholder:text-primary/70 w-full"
                                placeholder="your@email.com"
                            />
                            {validEmail ? (
                                <Check className="h-6 w-6 text-[#C2E812] flex-shrink-0" />
                            ) : (
                                <X className="h-6 w-6 text-red-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>
                </form>

                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="w-full mt-10 mx-0 mb-5 bg-[#C2E812] text-primary hover:bg-[#C2E812] text-lg font-semibold"
                >
                    Create my DAO
                </Button>
            </div>
        </>
    );
}

export default CommunityCreationModal;