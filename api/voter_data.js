export default async function handler(req, res) {
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    const { ward, gender } = req.query;

    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?ward=${ward}&gender=${gender}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "ডাটা সংগ্রহ করতে সমস্যা হয়েছে", details: error.message });
    }
}
