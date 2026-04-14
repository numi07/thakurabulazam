export default async function handler(req, res) {
    const VOTER_URL = process.env.VOTER_PAGE_SCRIPT_URL;
    try {
        const response = await fetch(VOTER_URL);
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Voter stats fetch failed" });
    }
}
