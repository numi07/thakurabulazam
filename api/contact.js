export default async function handler(req, res) {
    const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL; 
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    const referer = req.headers.referer || "";
    const allowedDomain = "thakurabulazam.pro.bd";
    const isAllowedSource = referer.includes(allowedDomain) || referer.includes("localhost");

    try {
        if (req.method === 'POST') {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: new URLSearchParams(req.body).toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const result = await response.text();
            return res.status(200).json({ success: true, data: result });
        }

        if (req.method === 'GET') {
            const { pass } = req.query;
            if (!isAllowedSource && pass !== ADMIN_PASSWORD) {
                return res.status(403).json({ 
                    success: false, 
                    message: "সরাসরি এক্সেস নিষিদ্ধ! ডাটা দেখতে আপনার ওয়েবসাইট ভিজিট করুন।" 
                });
            }

            const response = await fetch(SCRIPT_URL);
            const data = await response.json();
            res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
            
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
