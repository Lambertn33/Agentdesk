import React from 'react';
import { Nav, Footer } from '../';

interface LayoutProps {
    children: React.ReactNode;
    auth?: {
        user?: {
            id: number;
            names: string;
            email: string;
            role: 'ADMIN' | 'USER';
            status: 'ACTIVE' | 'INACTIVE';
        } | null;
    };
}

const Layout: React.FC<LayoutProps> = ({ children, auth }) => {
    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a] pb-12">
            <Nav user={auth?.user} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
