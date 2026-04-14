export default async function handler(req, res) {
    const FRAME_SCRIPT_URL = process.env.FRAME_SCRIPT_URL;
    const referer = req.headers.referer || "";
    const allowedDomain = "thakurabulazam.pro.bd";
    if (!referer.includes(allowedDomain) && !referer.includes("localhost")) {
        return res.status(403).json({ 
            success: false, 
            message: "সরাসরি এক্সেস নিষিদ্ধ! ফ্রেম দেখতে আপনার ওয়েবসাইট ভিজিট করুন।" 
        });
    }

    try {
        const response = await fetch(FRAME_SCRIPT_URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            error: "ফ্রেম লোড করতে ব্যর্থ", 
            details: error.message 
        });
    }
}
