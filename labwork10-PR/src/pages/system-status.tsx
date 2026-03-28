import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type SystemProps = {
    serverTime: string;
    userAgent: string;
}

// this function is required to ensure data is fetched fresh
export const getServerSideProps = (async ({ req, res }) => {
    console.log("[Server Only] getServerSideProps function executes here.");
    const userAgent = req.headers["user-agent"] || "Unknown";
    const serverTime = new Date().toLocaleString();

    const systemData: SystemProps = { serverTime, userAgent }
    return { props: { systemData } }
}) satisfies GetServerSideProps<{ systemData: SystemProps }>


export default function SystemStatusPage({ systemData: { serverTime, userAgent } }
    : InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("[Server and Client] SystemStatusPage Component executes here.");

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