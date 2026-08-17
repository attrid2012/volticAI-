const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/solve", async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                error: "Question is required."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6",
            input: question
        });

        res.json({
            answer: response.output_text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "AI request failed."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`volticAI server running on port ${PORT}`);
});
