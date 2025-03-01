import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from '@/components/ui/button';

const EmailDetailPage = () => {
    const location = useLocation();
    const email = location.state; // Ambil data dari state
    const navigate = useNavigate();
    if (!email) {
        navigate(-1);
        return <p>No email data available.</p>;
    }

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);

        const datePart = date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

        const timePart = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        return `${datePart} ${timePart.replace(/\./g, ':')}`;
    };


    return (
        <>
            <div className="space-y-4 mb-4">
                <Button variant={"ghost"} className="flex items-center mt-4 gap-2 text-lg font-medium"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Kembali
                </Button>
                <PageHeader>
                    <PageHeaderHeading>{email.subject}</PageHeaderHeading>
                </PageHeader>
                <CardTitle>{formatDate(email.date)}</CardTitle>
                <Card>
                    <CardHeader>
                        <CardDescription>
                            <div className="overflow-x-auto max-w-full" dangerouslySetInnerHTML={{ __html: email.html }} />
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </>
    );
};

export default EmailDetailPage;
