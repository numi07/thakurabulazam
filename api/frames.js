export default async function handler(req, res) {
    const FRAME_SCRIPT_URL = process.env.FRAME_SCRIPT_URL;

    try {
        const response = await fetch(FRAME_SCRIPT_URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "ফ্রেম লোড করতে ব্যর্থ", details: error.message });
    }
}
