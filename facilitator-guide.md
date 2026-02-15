# Facilitator Guide - Cursor Workshop Part 2

## Pre-Workshop Checklist

### 1 Week Before
- [ ] Test plugin loading in Figma Desktop
- [ ] Gather 10-15 real tokens from your design system
- [ ] Practice Space Invaders demo (time yourself)
- [ ] Prepare backup standalone version
- [ ] Send prerequisites email to attendees

### 1 Day Before
- [ ] Review all slides and demo script
- [ ] Test Cursor installation on workshop machine
- [ ] Verify Figma Desktop is installed
- [ ] Prepare sample tokens file
- [ ] Set up projector/screen sharing

### Day Of
- [ ] Arrive 15 mins early
- [ ] Test plugin loading one more time
- [ ] Have backup standalone version ready
- [ ] Open design system documentation
- [ ] Prepare sample token values

---

## Section-by-Section Guide

### Section 1: Introduction (10 mins)

**Key Points:**
- Keep it energetic and welcoming
- Emphasize "no coding experience needed"
- Show actual Cursor interface (not just slides)
- Make the "personal software" concept tangible

**Common Questions:**
- "Do I need to know how to code?" → No! Just describe what you want.
- "Is this free?" → Cursor has free tier, paid plans for heavy usage.
- "Can I use this for work?" → Yes! Many professionals use it daily.

**Timing Tips:**
- Don't spend too long on IDE explanation
- Focus on the paradigm shift
- Save detailed interface tour for live demo

---

### Section 2: Space Invaders Demo (20 mins)

**Critical Timing:**
- This is the longest section - stay on track!
- If running behind, skip Git checkpoint (can mention briefly)
- Never skip the iteration example - it's the most important

**Demo Tips:**
- **Pause for questions** - but keep moving
- **Show the code** - even if attendees don't understand it
- **Emphasize natural language** - "I said 'fix scrolling', not 'add preventDefault'"
- **Make mistakes visible** - show that iteration is normal

**If Demo Fails:**
- Have a pre-recorded video backup
- Or use screenshots from a previous run
- Don't panic - explain what SHOULD happen

**Key Moments:**
1. **Plan generation** - "Look at this plan! It's thinking first."
2. **First preview** - "It actually works! No coding from us."
3. **Iteration** - "We described the problem, AI fixed it."
4. **Ask mode** - "AI can be your tutor, not just a code generator."

---

### Section 3: Plugin Build (25 mins)

**Phase 1: Setup (5 mins)**
- **Critical:** Ensure everyone has Figma Desktop (not web)
- Walk through manifest.json creation slowly
- Show how to load plugin step-by-step
- If someone can't load it, have them use backup standalone

**Phase 2: Build UI (15 mins)**
- **Read the prompt aloud** - show exactly what to type
- **Wait for generation** - this takes 30-60 seconds
- **Explain the code** - even briefly, show structure
- **Test together** - make sure it works before moving on

**Common Issues:**
- Plugin won't load → Check manifest.json path
- Code doesn't generate → Check internet connection
- UI looks broken → Check browser console (F12)

**Phase 3: Add Real Tokens (5 mins)**
- **Have tokens ready** - paste from your docs
- **Show the structure** - explain JSON format briefly
- **Test search** - make sure it works with real data
- **Encourage customization** - "Add your own tokens!"

**If Running Behind:**
- Skip detailed code explanation
- Focus on the workflow
- Emphasize they can explore later

---

### Section 4: Wrap-Up (5 mins)

**Must Cover:**
- Recap key concepts
- Challenge assignment
- Resources
- Q&A

**Keep It Short:**
- Don't add new concepts
- Answer questions but don't go down rabbit holes
- End on high note - "You built a real plugin!"

---

## Troubleshooting Guide

### Plugin Won't Load
**Symptoms:** Error when importing manifest
**Solutions:**
1. Check file path is correct
2. Verify manifest.json syntax (use JSON validator)
3. Ensure Figma Desktop (not web)
4. Try restarting Figma
5. Fallback: Use standalone HTML version

### Code Generation Fails
**Symptoms:** AI doesn't respond or generates errors
**Solutions:**
1. Check internet connection
2. Verify Cursor is signed in
3. Try rephrasing the prompt
4. Check context window isn't full
5. Start new chat

### Attendee Can't Follow Along
**Solutions:**
1. Have them pair up with neighbor
2. Provide completed code as reference
3. Focus on understanding concepts vs. typing code
4. Offer to help after workshop

### Time Running Out
**Priorities:**
1. Complete plugin build (even if rushed)
2. Show it working
3. Skip detailed explanations
4. Provide resources for self-study

---

## Engagement Tips

### Keep Energy High
- Move around the room
- Ask rhetorical questions
- Use real examples from your work
- Celebrate small wins ("Look! It works!")

### Make It Relatable
- "How many times have you searched for a color token?"
- "This plugin solves YOUR problem, not a generic one"
- "You're building something you'll use tomorrow"

### Encourage Questions
- Pause after each major concept
- "Any questions before we move on?"
- Don't rush past confusion

### Build Confidence
- "You're doing great!"
- "This is real development work"
- "You built this in 25 minutes!"

---

## Post-Workshop Follow-Up

### Send Within 24 Hours
- Workshop materials (GitHub link or zip)
- Challenge reminder
- Resources list
- Survey link (optional)

### Challenge Support
- Offer office hours for questions
- Create Slack channel for sharing
- Share examples of what others built

### Next Steps
- Consider Part 3: Advanced features
- Share success stories
- Collect feedback for improvement

---

## Sample Email to Attendees (Pre-Workshop)

**Subject:** Cursor Workshop Part 2 - Prerequisites

Hi team,

Looking forward to our hands-on Cursor workshop! Here's what you need:

**Required:**
- Cursor IDE installed: [cursor.com/download](https://cursor.com/download)
- Figma Desktop app (not web version)
- Figma account (free tier works)

**Optional but helpful:**
- Design system documentation open
- A few token values ready (colors, spacing, typography)

**No coding experience needed!** We'll learn together.

See you at [time] in [location]!

---

## Success Metrics

**Workshop is successful if:**
- ✅ Attendees can navigate Cursor confidently
- ✅ Everyone builds a working plugin (or understands how)
- ✅ Attendees feel empowered to try building tools
- ✅ Questions are answered clearly
- ✅ Energy stays high throughout

**Red flags:**
- ⚠️ Too many technical questions (adjust pace)
- ⚠️ Attendees falling behind (check in individually)
- ⚠️ Low engagement (add more interaction)
- ⚠️ Running way over time (cut non-essential parts)

---

## Additional Resources

### For Advanced Attendees
- Cursor Composer mode
- Custom rules files
- Git integration
- Terminal usage

### For Struggling Attendees
- Simplified prompts
- Step-by-step handouts
- One-on-one help
- Completed code reference

---

## Final Tips

1. **Practice the demo** - Know it cold
2. **Have backups** - Plugin, standalone, video
3. **Stay flexible** - Adjust based on audience
4. **End strong** - Leave them excited to try more
5. **Follow up** - Support their continued learning

Good luck! You've got this! 🚀
