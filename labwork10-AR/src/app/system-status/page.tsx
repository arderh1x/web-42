import { headers } from "next/headers";

export default async function SystemStatusPage() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";
    const serverTime = new Date().toLocaleString();

    console.log("[Server Only] SystemStatusPage executes here."); // interesting - dev mode display this log in browser, but with own "server" label

    return (
        <main style={{ padding: 16 }}>
            <h1 style={{ marginBottom: 16 }}>System Status page</h1>

            <div>Server time:
                <pre> {serverTime}</pre>
            </div>

            <br />

            <div>User agent info from headers:
                <pre> {userAgent}</pre>
            </div>
        </main>
    );
}