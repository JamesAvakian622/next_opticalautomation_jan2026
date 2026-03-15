# Skills Installation Guide

## Quick Start

All skills are packaged and ready to use. Each skill includes:
- `SKILL.md` - Instructions for the AI agent
- `scripts/` - Helper scripts (if applicable)
- `.zip` package - Ready for distribution

## Installation Methods

### For Claude Code / Kiro

Copy the skill directory to your skills folder:

```bash
# Install a single skill
cp -r skills/react-best-practices ~/.kiro/skills/

# Install all skills
cp -r skills/*-*/ ~/.kiro/skills/
```

### For claude.ai

1. Open your project settings
2. Add the skill's SKILL.md to project knowledge
3. Or paste the SKILL.md contents directly into the conversation

### For Other AI Coding Assistants

Most AI coding assistants support custom instructions:
1. Extract the `.zip` file
2. Copy the SKILL.md content to your assistant's custom instructions
3. Reference scripts using absolute paths if needed

## Available Skills

### 1. react-best-practices (2.8KB)
**Category:** Performance  
**Priority:** Critical  
**Rules:** 40+

React and Next.js performance optimization guidelines. Use when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Optimizing bundle size or load times

### 2. web-design-guidelines (4.0KB)
**Category:** Design  
**Priority:** High  
**Rules:** 100+

UI/UX compliance auditing. Use when:
- "Review my UI"
- "Check accessibility"
- "Audit design"
- "Check my site against best practices"

### 3. react-native-guidelines (2.4KB)
**Category:** Mobile  
**Priority:** High  
**Rules:** 16

React Native best practices. Use when:
- Building React Native or Expo apps
- Optimizing mobile performance
- Implementing animations or gestures
- Working with native modules or platform APIs

### 4. composition-patterns (2.4KB)
**Category:** Architecture  
**Priority:** Medium  
**Patterns:** 4

React composition patterns. Use when:
- Refactoring components with many boolean props
- Building reusable component libraries
- Designing flexible APIs
- Reviewing component architecture

### 5. vercel-deploy-claimable (2.8KB)
**Category:** Deployment  
**Priority:** Medium  
**Has Scripts:** Yes

Deploy to Vercel instantly. Use when:
- "Deploy my app"
- "Deploy this to production"
- "Push this live"
- "Deploy and give me the link"

## Verification

After installation, verify skills are available:

```bash
# Check installed skills
ls ~/.kiro/skills/

# Test a skill (example)
cat ~/.kiro/skills/react-best-practices/SKILL.md
```

## Usage

Skills are automatically activated when relevant. Examples:

```
"Review this React component for performance issues"
→ Activates react-best-practices

"Check my UI for accessibility problems"
→ Activates web-design-guidelines

"Deploy my Next.js app"
→ Activates vercel-deploy-claimable
```

## Troubleshooting

**Skill not activating:**
- Ensure SKILL.md is in the correct location
- Check that the skill name matches the directory name
- Verify the frontmatter (name, description) is properly formatted

**Scripts not executing:**
- Make scripts executable: `chmod +x scripts/*.sh`
- Check script paths match documentation
- Verify bash is available: `which bash`

**Network access required:**
- Some skills (like vercel-deploy-claimable) need network access
- Configure allowed domains in your AI assistant settings
- Check firewall/proxy settings

## Updates

To update a skill:
1. Download the latest `.zip` package
2. Extract and replace the existing skill directory
3. Restart your AI assistant if needed

## Support

For issues or questions:
- Check the skill's SKILL.md for troubleshooting section
- Review AGENTS.md for skill creation guidelines
- Consult README.md for overview and examples
