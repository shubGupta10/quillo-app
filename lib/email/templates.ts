export function getWelcomeEmailHtml(name: string) {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Quillo, ${name}! 🎉</h2>
      <p>We're thrilled to have you on board. Start logging your daily work and let's turn it into great content.</p>
    </div>
  `;
}

export function getScheduledEmailHtml(postTitle: string, scheduledDate: Date) {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your post is scheduled! 📅</h2>
      <p>Your post "<strong>${postTitle}</strong>" has been scheduled to go out on ${scheduledDate.toLocaleString()}.</p>
    </div>
  `;
}

export function getPublishedEmailHtml(postTitle: string, platform: string) {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Post Published Successfully! 🚀</h2>
      <p>Great news! Your post "<strong>${postTitle}</strong>" has just been published on ${platform}.</p>
    </div>
  `;
}
