export default async function handler(req, res) {
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
    const referer = req.headers.referer || "";
    const allowedDomain = "thakurabulazam.pro.bd";
    if (!referer.includes(allowedDomain) && !referer.includes("localhost")) {
        return res.status(403).json({ 
            success: false, 
            message: "সরাসরি এক্সেস নিষিদ্ধ! ডাটা দেখতে আপনার ওয়েবসাইট ভিজিট করুন।" 
        });
    }
    const { ward, gender } = req.query;

    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?ward=${ward}&gender=${gender}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
        
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            error: "ডাটা সংগ্রহ করতে সমস্যা হয়েছে", 
            details: error.message 
        });
    }
}
