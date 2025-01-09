import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const FileInput = ({
                       label = 'Upload File',
                       accept = '.png',
                       onChange,
                       value,
                       isValid,
                       className,
                       helperText,
                       required = false,
                   }) => {
    return (
        <div className="space-y-2">
            <Label className="text-lg font-medium flex items-center gap-2">
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>

            <div className="relative">
                <div
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border-2 border-dashed transition-colors",
                        "hover:border-primary/50 focus-within:border-primary",
                        isValid ? "border-green-500/50" : "border-primary/20",
                        className
                    )}
                >
                    <div className="flex-1">
                        <Input
                            type="file"
                            accept={accept}
                            onChange={onChange}
                            className={cn(
                                "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0",
                                "file:text-sm file:font-medium file:bg-primary/10",
                                "hover:file:bg-primary/20 file:text-off-white",
                                "text-sm text-off-white/70"
                            )}
                        />
                    </div>

                    <div className="flex-shrink-0">
                        {value ? (
                            isValid ? (
                                <Check className="h-5 w-5 text-green-500" />
                            ) : (
                                <X className="h-5 w-5 text-red-500" />
                            )
                        ) : (
                            <Upload className="h-5 w-5 text-primary/50" />
                        )}
                    </div>
                </div>
            </div>

            {helperText && (
                <p className="text-sm text-primary/70">{helperText}</p>
            )}
        </div>
    );
};

export default FileInput;