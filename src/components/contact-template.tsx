type Props = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactTemp({ name, email, subject, message }: Props) {
    return (
        <div className="max-w-lg mx-auto bg-gray-100 border border-gray-300 rounded-lg p-6 text-gray-800">
            {/* Header */}
            <h2 className="text-xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-2">
                New Contact Form Submission
            </h2>

            {/* User Info */}
            <div className="mt-4 space-y-2">
                <p>
                    <span className="font-semibold">Name:</span> {name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {email}
                </p>
                <p>
                    <span className="font-semibold">Subject:</span> {subject}
                </p>
            </div>

            {/* Message */}
            <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                <p className="italic text-gray-700">{message}</p>
            </div>

            {/* Footer */}
            <p className="mt-6 text-sm text-gray-500">
                You received this message from your website&#39;s contact form.
            </p>
        </div>
    );
}
