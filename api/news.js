export default async function handler(req, res) {
    const SCRIPT_URL = process.env.NEWS_PAGE_SCRIPT_URL;
    const ADMIN_PASS = process.env.NEWS_ADMIN_PASSWORD;

    if (req.method === 'GET') {
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "ডাটা লোড করতে ব্যর্থ" });
        }
    }

    if (req.method === 'POST') {
        const body = req.body;

        if (body.action === 'login') {
            if (body.password === ADMIN_PASS) {
                return res.status(200).json({ authenticated: true });
            } else {
                return res.status(401).json({ authenticated: false });
            }
        }
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: "অ্যাকশন সম্পন্ন করতে ব্যর্থ" });
        }
    }
}
