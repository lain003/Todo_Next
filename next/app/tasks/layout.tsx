export default function DashboardLayout(
    {
        children,
    }: {
    children: React.ReactNode
}) {
    return (
        <div className="container mx-auto my-10">
            <h1 className="text-center text-3xl font-semibold mb-4">
                To Do List
            </h1>
            <div className="md:w-1/2 mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}