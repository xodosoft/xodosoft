import { Html, Head, Font, Heading, Text, Hr, Container, Img, Tailwind } from '@react-email/components';

interface ContactTemplateProps {
    name?: string;
    email: string;
    subject: string;
    message: string;
}

interface QuoteTemplateProps extends ContactTemplateProps {
    firstName: string;
    lastName: string;
    phone: string;
    service: string;
    date: string;
}

export const ContactTemplate = ({ name, email, subject, message }: ContactTemplateProps) => {
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Poppins"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
                        format: 'woff2',
                    }}
                />
            </Head>
            <Tailwind>
                <Container className="p-6 max-w-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <Img src={`${process.env.NEXT_PUBLIC_API_URL}/images/logo.png`} width="150" alt="Xodosoft Logo" />

                    <Heading>
                        New Contact Form Submission
                    </Heading>
                    <Text className="text-sm"><strong>Name:</strong> {name}</Text>
                    <Text className="text-sm"><strong>Email:</strong> {email}</Text>
                    <Text className="text-sm"><strong>Subject:</strong> {subject}</Text>

                    <Hr className="my-4 border-gray-300" />

                    <Text className="text-sm"><strong>Message:</strong> {message}</Text>
                </Container>
            </Tailwind>
        </Html>
    );
};


export const QuoteTemplate = ({ firstName, lastName, email, phone, service, date, subject, message }: QuoteTemplateProps) => {
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Poppins"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
                        format: 'woff2',
                    }}
                />
            </Head>
            <Tailwind>
                <Container className="p-6 max-w-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <Img src={`${process.env.NEXT_PUBLIC_API_URL}/images/logo.png`} width="150" alt="Xodosoft Logo" />

                    <Heading>
                        New Quote Form Submission
                    </Heading>
                    <Text className="text-sm"><strong>Name:</strong> {firstName} {lastName}</Text>
                    <Text className="text-sm"><strong>Email:</strong> {email}</Text>
                    <Text className="text-sm"><strong>Phone:</strong> {phone}</Text>
                    <Text className="text-sm"><strong>Service:</strong> {service}</Text>
                    <Text className="text-sm"><strong>Preferred date for a call:</strong> {date}</Text>
                    <Text className="text-sm"><strong>Subject:</strong> {subject}</Text>

                    <Hr className="my-4 border-gray-300" />

                    <Text className="text-sm"><strong>Message:</strong> {message}</Text>
                </Container>
            </Tailwind>
        </Html>
    );
};