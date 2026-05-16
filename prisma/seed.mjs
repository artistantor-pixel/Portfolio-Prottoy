import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.profile.deleteMany();

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  await prisma.profile.create({
    data: {
      heroText: 'I work with businesses to improve their online presence, boost visibility, and turn audiences into active customers through data-driven strategies.',
      aboutText: "Hello! I'm Prottoy D'Rozario, a Digital Marketer and Graphic Designer with 3 years of experience. I specialize in turning creative ideas into profitable ad campaigns and stunning visual content. From Meta Ads that convert to logos that tell a story, I provide end-to-end solutions for brands looking to scale.",
      email: 'emmanuel.prottoy102@gmail.com'
    }
  });

  const projects = [
    {
      title: "Beginner Artists Campaign",
      desc: "Generated 520+ messaging conversations in 30 days with only a ৳600 daily budget. Achieved a low ৳13.65 cost per conversation through targeted strategy.",
      stats: JSON.stringify([{ label: "Conv", value: "520+" }, { label: "Cost/C", value: "৳13.65" }, { label: "Budget", value: "৳600/d" }]),
      icon: "Users"
    },
    {
      title: "Whiteboard Product Campaign",
      desc: "Generated 1,667+ Meta leads in 150 days with a ৳1,043 daily budget. Achieved strong lead generation at only ৳48.38 cost per lead.",
      stats: JSON.stringify([{ label: "Leads", value: "1,667+" }, { label: "Cost/L", value: "৳48.38" }, { label: "Budget", value: "৳1,043/d" }]),
      icon: "Target"
    },
    {
      title: "145 PCS Unicorn Art Set",
      desc: "Generated 5,573+ messaging conversations in 150 days with a ৳1,492 daily budget. Achieved an excellent ৳12.19 cost per conversation.",
      stats: JSON.stringify([{ label: "Conv", value: "5,573+" }, { label: "Cost/C", value: "৳12.19" }, { label: "Budget", value: "৳1,492/d" }]),
      icon: "TrendingUp"
    },
    {
      title: "Canvas Combo Campaign",
      desc: "Generated 2,272+ messaging conversations in 50 days with a ৳2,010 daily budget. Achieved a strong ৳44.22 cost per conversation.",
      stats: JSON.stringify([{ label: "Conv", value: "2,272+" }, { label: "Cost/C", value: "৳44.22" }, { label: "Budget", value: "৳2,010/d" }]),
      icon: "BarChart3"
    }
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  const experiences = [
    { company: "Dhaka Stationery (Canvas)", role: "Social Media Manager", period: "Present", desc: "Managing Facebook page, running ad campaigns, and creating marketing content to grow brand awareness and sales." },
    { company: "SS Grupe", role: "Social Media Manager", period: "2025", desc: "Facebook page setup, LinkedIn profile creation, and social media management." },
    { company: "Venue Mart", role: "Social Media Manager", period: "2023–2025", desc: "Managed Facebook ads, page growth, and created engaging social media designs." },
    { company: "Hotel Sukhtara", role: "Facebook Ads Campaign Manager", period: "2025", desc: "Created and managed Facebook ad campaigns and promotional designs." }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  const education = [
    { institution: "World University", degree: "Bachelor's Degree In Mechanical Engineering", year: "2022 - Present" },
    { institution: "Mawts institute of technology", degree: "Diploma in Engineering", year: "2018 - 2022" },
    { institution: "SR Dream It", degree: "Digital Marketing Course", year: "2023 (6 Month)" }
  ];

  for (const edu of education) {
    await prisma.education.create({ data: edu });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
