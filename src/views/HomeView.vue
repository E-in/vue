<template>
  <div>
    <h1>Tracking Your Psoriasis Outbreaks</h1>
    <p>
      There are few proven triggers for psoriasis. But many people with psoriasis feel a connection between certain activities or exposures and their psoriasis outbreaks.
    </p>
    <p>
      Tracking psoriasis flares can help you feel more in control of your condition. It can also help you communicate better with the doctor and might reduce your psoriasis symptoms.
    </p>
    <h2>Record Your Psoriasis With PsoriaLog</h2>
    <p>PsoriaLog can help you to record your psoriasis symptom and help you to find the trigger of the psoriasis</p>
    <ul>
      <li><strong>Symptom Record</strong> with the help of Symptom Record, you can record the Date, Pattern, Severity, Location and the possible trigger of your psoriasis symptom</li>
      <li><strong>Symptom Review</strong> with the help of the Symptom Manage, you can use the search function to review your recorded symptom with specific pattern or triggers so that you can find your possible triggers of the paoriasis</li>
    </ul>
    <h2>Psoriasis Pattern</h2>
    <p>Psoriasis is unique in each person with the condition, but there are certain categories:</p>
    <ul>
      <li><strong>Plaque psoriasis:</strong> Most people (80%) develop raised, inflamed red skin (plaques) covered by scales that can be white or silver.</li>
      <li><strong>Pustular psoriasis:</strong> Blisters filled with pus (pustules) usually occur on the hands and feet.</li>
      <li><strong>Guttate psoriasis:</strong> Small inflamed red papules can occur anywhere in this form of psoriasis. The affected skin is thinner and less scaly than plaque psoriasis.</li>
      <li><strong>Inverse psoriasis:</strong> Smooth, red skin appears in skin folds in the armpits, groin, or under the breasts.</li>
      <li><strong>Erythrodermic psoriasis:</strong> Intensely red areas cover large sections of skin.</li>
    </ul>
    <h2>Psoriasis Triggers</h2>
    <p>
      Although these psoriasis triggers aren’t all proven, individual people have found triggers they feel spark their own psoriasis outbreaks:
    </p>
    <ul>
      <li>Emotional stress</li>
      <li>Medications, including beta-blockers, anti-malaria drugs, NSAIDs such as ibuprofen, and lithium</li>
      <li>Winter climates</li>
      <li>Shaving or any injury to your skin such as from vaccinations, scratches, or sunburns</li>
      <li>Caffeine</li>
      <li>Alcohol</li>
      <li>Infection (strep throat)</li>
      <li>Smoking</li>
      <li>Fatty meats</li>
    </ul>
    <p>
      Write down any associations you can think of. Over time, looking back through your records may reveal patterns that help identify your own triggers for psoriasis outbreaks.
    </p>
    <h2>Protect Your Skin From Psoriasis Outbreaks</h2>
    <p>Skin damage is a known trigger for psoriasis flares. Scratches, scrapes, cuts, and burns all can set you up for a psoriasis outbreak on the area of damaged skin.</p>
    <p>Below are tips for preventing skin damage and psoriasis outbreaks:</p>
    <ul>
      <li>Keep your skin moist. Dry skin is more prone to injury.</li>
      <li>Wear protective clothing when doing yard work or household chores.</li>
      <li>Treat itching with lotions and creams -- scratching feels good at first, but it damages skin.</li>
      <li>Consider skipping a day between shaves, changing razors frequently, or using an electric razor, if facial psoriasis is a problem.</li>
    </ul>
    <p>
      Once you have a handle on what causes your psoriasis to flare, it’s time to talk to your doctor. There may not be time to go through every detail in a short visit, so the most important information is your response to psoriasis treatment.
    </p>
    <ul>
      <li>Have you applied topical therapies and taken other drugs consistently? Your treatment log will let you answer with certainty.</li>
      <li>Are there associations between your other medications and your psoriasis outbreaks? Discuss any possible psoriasis triggers with your doctor.</li>
      <li>Are your psoriasis treatments working? Your drawings or photographs over time will show the details that memory alone can’t.</li>
    </ul>
    <p>
      Many aspects of psoriasis are outside your control. Tracking your psoriasis triggers and outbreaks can help you understand your own psoriasis pattern and could lead to changes that reduce your symptoms.
    </p>
  </div>
</template>

<script>
export default {
  name: "PsoriasisOutbreakTracker",
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  background: #f0f8ff;
  padding: 20px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #20b2aa;
  padding: 10px 20px;
}

.logo {
  height: 50px;
}

nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

main {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: #20b2aa;
}

h2 {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #20b2aa;
}

p {
  margin-bottom: 1em;
}

ul {
  margin-left: 20px;
  list-style-type: disc;
}

li {
  margin-bottom: 0.5em;
}
</style>