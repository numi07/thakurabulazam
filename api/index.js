export default async function handler(req, res) {
    const NEWS_URL = process.env.NEWS_PAGE_SCRIPT_URL;
    const VOTER_URL = process.env.VOTER_PAGE_SCRIPT_URL;
    const { type } = req.query;

    try {
        let targetUrl = "";
        if (type === 'news') {
            targetUrl = NEWS_URL;
        } else if (type === 'voter') {
            targetUrl = VOTER_URL;
        } else {
            return res.status(400).json({ error: "Invalid request type" });
        }

        const response = await fetch(targetUrl);
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
