import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const ConditionalLink = ({ children, loginHandler }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const loginSuccess = await loginHandler();

            if (loginSuccess) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Link href="#" onClick={handleClick} className={isLoading ? 'opacity-50' : ''}>
            {isLoading ? 'Loading...' : children}
        </Link>
    );
};

export default ConditionalLink;