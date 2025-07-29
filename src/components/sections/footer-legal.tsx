import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-[#0a0613] py-8 text-white">
            <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center px-4 text-center md:px-6">
                <h4 className="mb-2 text-2xl font-semibold">LegalCopilot</h4>
                <p className="mb-4 text-white/60">AI-Powered Litigation Strategy</p>
                <div className="text-sm text-white/40">
                    <p>© {new Date().getFullYear()} LegalCopilot. All Rights Reserved.</p>
                    <p className="mt-2">
                        Designed and developed by{' '}
                        <Link
                            href="https://github.com/webpagesbypatel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white"
                        >
                            webpagesbypatel
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
