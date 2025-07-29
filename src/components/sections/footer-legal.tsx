import Link from "next/link";
import { Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-[#0a0613] py-12 text-white">
            <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-6">
                <div className="col-span-2 md:col-span-1">
                    <h4 className="mb-4 text-xl font-semibold">LegalCopilot</h4>
                    <p className="text-white/60">AI-Powered Litigation Strategy</p>
                </div>
                <div>
                    <h5 className="mb-4 font-semibold text-white/80">Product</h5>
                    <ul className="space-y-2 text-white/60">
                        <li><Link href="#features" className="hover:text-white">Features</Link></li>
                        <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                        <li><Link href="/security" className="hover:text-white">Security</Link></li>
                    </ul>
                </div>
                 <div>
                    <h5 className="mb-4 font-semibold text-white/80">Company</h5>
                    <ul className="space-y-2 text-white/60">
                        <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="mb-4 font-semibold text-white/80">Legal</h5>
                    <ul className="space-y-2 text-white/60">
                        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
             <div className="container mx-auto mt-12 max-w-7xl px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p className="text-sm text-white/40">© {new Date().getFullYear()} LegalCopilot. All Rights Reserved.</p>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                    <Link href="#" className="text-white/60 hover:text-white"><Twitter size={20}/></Link>
                    <Link href="#" className="text-white/60 hover:text-white"><Linkedin size={20}/></Link>
                    <Link href="#" className="text-white/60 hover:text-white"><Facebook size={20}/></Link>
                </div>
            </div>
        </footer>
    );
}
