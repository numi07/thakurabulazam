export default async function handler(req, res) {
    const FRAME_SCRIPT_URL = process.env.FRAME_SCRIPT_URL;

    try {
        // টাইমস্ট্যাম্প বা ক্যাশ এড়াতে কুয়েরি পাস করার প্রয়োজন হলে সরাসরি মেইন ইউআরএল কল করা হচ্ছে
        const response = await fetch(FRAME_SCRIPT_URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // CORS এবং রেসপন্স হ্যান্ডলিং
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "ফ্রেম লোড করতে ব্যর্থ", details: error.message });
    }
}
