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
      <p>Your post "<strong>${postTitle}</strong>" has been scheduled to go out on ${new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata' // Change this to whatever timezone you want to default to
  }).format(scheduledDate)}.</p>
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

export function getFeedbackNotificationEmailHtml(
  userName: string,
  userEmail: string,
  category: string,
  rating: number,
  message: string
) {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Feedback Received 💬</h2>
      <p><strong>From:</strong> ${userName} (${userEmail})</p>
      <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #f59e0b; margin: 8px 0; border-radius: 4px;">
        ${message}
      </blockquote>
    </div>
  `;
}
