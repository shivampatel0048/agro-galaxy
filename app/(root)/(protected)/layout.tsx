import Protected from "./Protected";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Protected>
            {children}
        </Protected>
    );
}
