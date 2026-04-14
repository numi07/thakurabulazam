export default async function handler(req, res) {
    const VOTER_URL = process.env.VOTER_PAGE_SCRIPT_URL;
    const referer = req.headers.referer || "";
    const allowedDomain = "thakurabulazam.pro.bd";
    if (!referer.includes(allowedDomain) && !referer.includes("localhost")) {
        return res.status(403).json({ 
            success: false, 
            message: "সরাসরি এক্সেস নিষিদ্ধ! ডাটা দেখতে আপনার ওয়েবসাইট ভিজিট করুন।" 
        });
    }

    try {
        const response = await fetch(VOTER_URL);
        
        if (!response.ok) {
            throw new Error('Voter stats fetch failed');
        }

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
        
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            error: "Voter stats fetch failed", 
            details: error.message 
        });
    }
}
