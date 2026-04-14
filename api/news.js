export default async function handler(req, res) {
    const SCRIPT_URL = process.env.NEWS_PAGE_SCRIPT_URL;
    const ADMIN_PASS = process.env.NEWS_ADMIN_PASSWORD;

    // ১. ডাটা গেট করার জন্য (GET Request)
    if (req.method === 'GET') {
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    // ২. ডাটা পোস্ট/লগইন চেক করার জন্য (POST Request)
    if (req.method === 'POST') {
        try {
            const body = req.body;

            // লগইন চেক লজিক
            if (body.action === 'check_auth') {
                if (ADMIN_PASS && body.password && body.password.trim() === ADMIN_PASS.trim()) {
                    return res.status(200).json({ authenticated: true });
                } else {
                    return res.status(401).json({ authenticated: false });
                }
            }

            // গুগল স্ক্রিপ্টে ক্রিয়েট/আপডেট/ডিলিট পাঠানো
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: "Action failed" });
        }
    }
}
