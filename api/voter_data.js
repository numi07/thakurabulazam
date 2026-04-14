// api/voter_data.js
export default async function handler(req, res) {
    // Vercel Environment Variable থেকে URL টি নিবে
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    const { ward, gender } = req.query;

    try {
        // গুগল স্ক্রিপ্ট থেকে ডাটা ফেচ করা হচ্ছে ব্যাকএন্ডে
        const response = await fetch(`${APPS_SCRIPT_URL}?ward=${ward}&gender=${gender}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // ডাটা ফ্রন্টএন্ডে পাঠিয়ে দেওয়া
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "ডাটা সংগ্রহ করতে সমস্যা হয়েছে", details: error.message });
    }
}
