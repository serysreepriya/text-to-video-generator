import asyncio
import edge_tts
import os

# Create output directory
os.makedirs("assets/audio", exist_ok=True)

# Available voices
voices = {
    "1": ("English Female", "en-US-JennyNeural"),
    "2": ("English Male", "en-US-GuyNeural"),
    "3": ("British Female", "en-GB-SoniaNeural"),
    "4": ("British Male", "en-GB-RyanNeural"),
    "5": ("Indian English Female", "en-IN-NeerjaNeural"),
    "6": ("Indian English Male", "en-IN-PrabhatNeural")
}

print("\n========== AI Voice Selection ==========")
for key, value in voices.items():
    print(f"{key}. {value[0]}")

choice = input("\nChoose a voice (1-6): ")

if choice not in voices:
    print("Invalid choice! Using default voice.")
    voice = "en-US-JennyNeural"
else:
    voice = voices[choice][1]

text = input("\nEnter the text to convert into speech:\n")

output_file = "assets/audio/output.mp3"

async def text_to_speech():
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_file)
    print(f"\n✅ Audio saved successfully as {output_file}")

asyncio.run(text_to_speech())