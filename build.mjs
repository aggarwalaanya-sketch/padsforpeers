import { readFileSync, writeFileSync } from 'node:fs';

const nav = [
  ['what-we-do.html', 'Comfort Boxes', 'program'],
  ['why-us.html', 'Why it matters', 'why'],
  ['partner-with-us.html', 'For schools', 'schools'],
  ['who-we-are.html', 'Who we are', 'about'],
  ['blog.html', 'Journal', 'journal'],
  ['contact.html', 'Contact', 'contact'],
  ['donate.html', 'Donate', 'donate'],
];

const arrow = '<span aria-hidden="true">↗</span>';
const programEmail = 'mailto:program@padsforpeers.org?subject=School%20partnership%20inquiry';
const generalEmail = 'mailto:inquiries@padsforpeers.org?subject=Pads%20for%20Peers%20inquiry';
const stripeOnce = 'https://buy.stripe.com/8x2dR9cbmfIQcau36N2go00';
const stripeMonthly = 'https://buy.stripe.com/3cI7sL2AMfIQ7Ue6iZ2go01';
const oldSite = 'https://aggarwalaanya-sketch.github.io/padsforpeers';

function gmail(to) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
}

function link(href, label, cls = 'underlined-link') {
  return `<a class="${cls}" href="${href}">${label} ${arrow}</a>`;
}

function header(active) {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top"><div class="header-inner wrap">
    <a class="wordmark" href="index.html" aria-label="Pads for Peers, home"><span>pads</span><small>for</small><span>peers</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
      <a class="mobile-home" href="index.html"${active === 'home' ? ' aria-current="page"' : ''}>Home</a>
      ${nav.map(([href, label, key]) => `<a href="${href}"${key === active ? ' aria-current="page"' : ''}${key === 'donate' ? ' class="nav-donate"' : active === 'period' && key === 'journal' ? ' class="section-active"' : ''}>${label}${key === 'donate' ? ` ${arrow}` : ''}</a>`).join('')}
    </nav>
  </div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap footer-top">
    <div><a class="wordmark footer-wordmark" href="index.html" aria-label="Pads for Peers, home"><span>pads</span><small>for</small><span>peers</span></a><p>Building lasting access to menstrual care, one school at a time.</p></div>
    <div><h3>Explore</h3><a href="what-we-do.html">Comfort Boxes</a><a href="why-us.html">Why it matters</a><a href="partner-with-us.html">For schools</a><a href="who-we-are.html">Who we are</a></div>
    <div><h3>Learn</h3><a href="blog.html">Breaking Barriers Blog</a><a href="period-poverty.html">Period poverty</a><a href="contact.html">Contact</a><a href="https://www.instagram.com/padsforpeers" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div>
    <div><h3>Support</h3><a href="donate.html">Donate</a><a href="privacy-policy.html">Privacy policy</a></div>
  </div><div class="wrap footer-bottom"><span>© <span id="year">2026</span> Pads for Peers</span><span>Menstrual care with dignity.</span><a href="#top">Back to top ↑</a></div></footer>`;
}

function shell({ title, description, active, body }) {
  return `<!doctype html><html lang="en"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#852c4c">
    <meta name="description" content="${description}"><title>${title} | Pads for Peers</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"><link rel="stylesheet" href="styles.css"><script src="script.js" defer></script>
  </head><body>${header(active)}<main id="main">${body}</main>${footer()}</body></html>`;
}

function pageHero({ eyebrow, title, lead, image, imageAlt, crumb, tone = '' }) {
  return `<section class="page-hero ${tone}"><div class="wrap">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
    <div class="page-hero-grid"><div><p class="eyebrow"><span class="eyebrow-line"></span>${eyebrow}</p><h1>${title}</h1><p class="hero-lead">${lead}</p></div>
    ${image ? `<div class="page-hero-image"><img src="${image}" alt="${imageAlt}" fetchpriority="high"></div>` : `<div class="page-hero-aside"><span>Care.</span><span>Choice.</span><span>Dignity.</span></div>`}</div>
  </div></section>`;
}

function impact() {
  return `<section class="impact" id="impact" aria-labelledby="impact-title"><div class="wrap"><div class="impact-heading"><p class="eyebrow light">Our work in numbers</p><h2 id="impact-title">Progress you can see.</h2></div><div class="impact-grid">
    <div class="impact-item"><strong>90<span>+</span></strong><span>Registered Students</span></div><div class="impact-item"><strong>12k<span>+</span></strong><span>Menstrual products distributed</span></div><div class="impact-item"><strong>4</strong><span>Schools and organizations reached</span></div><div class="impact-item"><strong>6</strong><span>Education and awareness events</span></div>
  </div></div></section>`;
}

function values() {
  return `<section class="values section-pad" aria-labelledby="values-title"><div class="wrap"><div class="section-top"><div><p class="eyebrow">Designed around students</p><h2 id="values-title" class="display-heading">Four principles guide the program.</h2></div></div><div class="values-grid">
    <div><span>01</span><h3>Access</h3><p>Support is offered through a place students already know.</p></div><div><span>02</span><h3>Choice</h3><p>Students select products that fit their individual needs.</p></div><div><span>03</span><h3>Privacy</h3><p>Discreet enrollment and pickup help protect confidentiality.</p></div><div><span>04</span><h3>Continuity</h3><p>Monthly boxes make support consistent and predictable.</p></div>
  </div></div></section>`;
}

function cta({ eyebrow = 'Take the next step', title, text, href, label, secondaryHref, secondaryLabel }) {
  return `<section class="give section-pad"><div class="wrap give-grid"><div><p class="eyebrow light">${eyebrow}</p><h2 class="display-heading">${title}</h2></div><div><p>${text}</p><div class="button-row"><a class="button button-cream" href="${href}">${label} ${arrow}</a>${secondaryHref ? `<a class="button button-outline-light" href="${secondaryHref}">${secondaryLabel} ${arrow}</a>` : ''}</div></div></div></section>`;
}

const approachCards = `<section class="approach section-pad" aria-labelledby="approach-title"><div class="wrap"><div class="section-top"><div><p class="eyebrow">Our approach</p><h2 id="approach-title" class="display-heading">Support that meets students where they are.</h2></div><p>Products, education, and school partnerships work together to make menstrual care easier to access.</p></div><div class="approach-grid">
  <article class="approach-card"><span class="card-number">01 / Access</span><div class="card-icon" aria-hidden="true">✳</div><h3>Comfort Boxes</h3><p>Monthly boxes give participating students free products they choose for their needs, delivered through their school.</p><a href="what-we-do.html">See the program ${arrow}</a></article>
  <article class="approach-card"><span class="card-number">02 / Understanding</span><div class="card-icon book-icon" aria-hidden="true">◌</div><h3>Period education</h3><p>Workshops and resources support informed, open conversations among students, educators, and communities.</p><a href="blog.html">Explore the journal ${arrow}</a></article>
  <article class="approach-card"><span class="card-number">03 / Continuity</span><div class="card-icon" aria-hidden="true">↗</div><h3>School partnerships</h3><p>We work with schools and community organizations to make support practical for staff and dependable for students.</p><a href="partner-with-us.html">Partner with us ${arrow}</a></article>
</div></div></section>`;

const home = `<section class="hero" aria-labelledby="hero-title"><div class="wrap hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="eyebrow-line"></span>School-based menstrual care</p><h1 id="hero-title">A school day should never stop for a period<span class="period">.</span></h1><p class="hero-lead">Pads for Peers helps students access free menstrual products through their schools, with privacy, choice, and dignity built into every step.</p><div class="button-row"><a class="button button-solid" href="contact.html">Bring us to your school ${arrow}</a>${link('what-we-do.html', 'Explore the program', 'text-link')}</div></div><div class="hero-visual"><div class="hero-image-frame"><img src="assets/comfort-boxes-campus.jpg" alt="Stacked Pads for Peers Comfort Boxes on a sunny school lawn" fetchpriority="high"></div><div class="hero-note"><span class="note-symbol" aria-hidden="true">✳</span><span>Thoughtful care.<br>Reliable access.</span></div></div></div></section>
${impact()}
${approachCards}
<section class="mission section-pad"><div class="wrap mission-grid"><div><p class="eyebrow">Our mission</p><h2 class="display-heading">Menstrual care is a basic need. Access should feel that way.</h2></div><div class="mission-copy"><p class="large-copy">Students who need period products should not have to rely on chance, ask around, or go without during the school day.</p><p>We make comfortable, good-quality menstrual products available to students who need them and help schools cultivate a supportive, open culture around periods.</p>${link('why-us.html', 'Why our approach matters')}</div></div></section>
${cta({ eyebrow:'Join the effort',title:'Help make the next school day easier.',text:'Support free, school-based menstrual care with a gift or a school partnership.',href:'donate.html',label:'Ways to give',secondaryHref:'partner-with-us.html',secondaryLabel:'For schools' })}`;

const program = `${pageHero({eyebrow:'Comfort Box Program',crumb:'Comfort Box Program',title:'Monthly care, built around each student.',lead:'Students select the menstrual products they need. Pads for Peers prepares personalized Comfort Boxes and delivers them through partner schools, with privacy and choice at the center.',image:'assets/comfort-box.png',imageAlt:'Open Comfort Box with menstrual products and a supportive note'})}
<section class="section-pad" id="how-it-works"><div class="wrap"><div class="section-top"><div><p class="eyebrow">How it works</p><h2 class="display-heading">A simple path to reliable access.</h2></div><p>Students choose what works for them. We coordinate the box and monthly delivery with the school.</p></div><div class="process-grid">
<article><span>01</span><h3>Sign up</h3><p>Scan a QR code or use a link to choose preferred products and quantities.</p></article><article><span>02</span><h3>Box preparation</h3><p>We pack a personalized Comfort Box with the products selected.</p></article><article><span>03</span><h3>Monthly delivery</h3><p>The box arrives at a designated location at school.</p></article><article><span>04</span><h3>Discreet pickup</h3><p>A confidential QR code helps students pick up their box without names displayed.</p></article>
</div></div></section>
${values()}
<section class="detail-band section-pad"><div class="wrap detail-band-grid"><div><p class="eyebrow light">Built for the school day</p><h2 class="display-heading">Care students can count on, month after month.</h2></div><div><p>Comfort Boxes are intended to make products available through a familiar school location, with a predictable pickup process and less stigma around asking for help.</p>${link('partner-with-us.html', 'See how schools partner', 'light-link')}</div></div></section>
${cta({title:'Bring Comfort Boxes to your school.',text:'We work with school staff to explain the program, answer questions, and plan a manageable setup.',href:'partner-with-us.html',label:'For schools',secondaryHref:programEmail,secondaryLabel:'Email the program team'})}`;

const why = `${pageHero({eyebrow:'Why Pads for Peers',crumb:'Why it matters',title:'Access works best when students can use it.',lead:'Products alone are not enough if students cannot get them when they need them. Our school-based model centers access, choice, privacy, and continuity.'})}
<section class="mission section-pad"><div class="wrap mission-grid"><div><p class="eyebrow">The need</p><h2 class="display-heading">No student should have to manage without what they need.</h2></div><div class="mission-copy"><p class="large-copy">The school day is easier when menstrual care is dependable and discreet.</p><p>Without an accessible option, students may have to ask staff, find an informal solution, or go without products. Pads for Peers works through schools to make support easier to find and use.</p>${link('what-we-do.html', 'Explore the Comfort Box Program')}</div></div></section>
${values()}
<section class="section-pad"><div class="wrap editorial-split"><div><p class="eyebrow">Beyond products</p><h2 class="display-heading">Open conversation matters, too.</h2></div><div><p>The Breaking Barriers Blog and educational outreach create space for information about menstruation, period poverty, and wellness. These resources support the more open culture our mission calls for.</p>${link('blog.html', 'Read the journal')}</div></div></section>
${cta({title:'Be part of lasting access.',text:'Schools, supporters, and communities can help make this work sustainable.',href:'partner-with-us.html',label:'Partner with us',secondaryHref:'donate.html',secondaryLabel:'Give today'})}`;

const schools = `${pageHero({eyebrow:'For administrators and school staff',crumb:'Partner with us',title:'Bring Pads for Peers to your school.',lead:'A free monthly Comfort Box program designed to support students discreetly and keep the process manageable for staff.'})}
<section class="schools section-pad"><div class="wrap schools-grid"><div><p class="eyebrow">A practical partnership</p><h2 class="display-heading">Your school helps create the access point.</h2><p class="large-copy">Pads for Peers coordinates onboarding, materials, box preparation, and monthly delivery.</p><p>School staff provide a designated pickup location, display student information posters, and hand boxes to students when they arrive for pickup.</p><a class="button button-solid" href="contact.html">Start a conversation ${arrow}</a><p class="fine-print">There is no cost to the school.</p></div><div class="schools-panel"><p class="panel-title">What the school provides</p><ul><li>A designated pickup location such as the front office or nurse’s office.</li><li>Space for student information posters.</li><li>A staff member to hand boxes to students at pickup.</li></ul><div class="panel-rule"></div><p>Students enroll privately using a QR code or link and select the products they need.</p></div></div></section>
<section class="section-pad soft-section"><div class="wrap"><div class="section-top"><div><p class="eyebrow">Getting started</p><h2 class="display-heading">A straightforward path from interest to delivery.</h2></div></div><div class="process-grid"><article><span>01</span><h3>Reach out</h3><p>A school administrator, nurse, or staff member contacts our program team.</p></article><article><span>02</span><h3>Set up</h3><p>We share onboarding information, materials, and posters.</p></article><article><span>03</span><h3>Student enrollment</h3><p>Students privately choose the products they need.</p></article><article><span>04</span><h3>Monthly pickup</h3><p>We deliver boxes to the school for discreet pickup.</p></article></div></div></section>
<section class="section-pad"><div class="wrap faq-grid"><div><p class="eyebrow">Common questions</p><h2 class="display-heading">What schools ask us.</h2></div><div class="faq-list"><details><summary>Is there a cost to the school?</summary><p>No. The program is designed to provide support to students without cost to the school.</p></details><details><summary>How much work is involved for staff?</summary><p>In most cases, staff provide a pickup location and hand boxes to students when they come to collect them.</p></details><details><summary>Do students sign up publicly?</summary><p>No. Enrollment and pickup are designed to be private and discreet.</p></details><details><summary>Do we need to manage inventory?</summary><p>The program is designed to keep logistics simple for schools and minimize school-side overhead.</p></details></div></div></section>
${cta({title:'Let’s talk about your school.',text:'Email the Pads for Peers program team to ask questions and discuss next steps. Reaching out does not commit your school to the program.',href:programEmail,label:'Email the program team',secondaryHref:'what-we-do.html',secondaryLabel:'See how it works'})}`;

const team = [
  ['Aanya Aggarwal','Co-founder','aanya.jpg',`Aanya has a keen interest in biotechnology research and medicine. Driven by her passion for using science to positively impact women's lives, she aspires to contribute to advancements in these fields. Aanya enjoys singing, acting, cooking, traveling, and reading murder mysteries.`],
  ['Laya Sunkara','Co-founder','laya.jpg',`Passionate about bioinformatics and business (especially investing), Laya hopes to one day run a genetics research lab. Outside of her academics, she enjoys writing songs, traveling, singing, baking cookies, making earrings, and watching detective shows.`],
  ['Leah Koo','Director of Finances','leah.jpg',`Leah has interests in local and federal civics and the economy. One day, she aspires to create a more equitable future where no one is limited by their background or birthplace. When she has extra time, Leah enjoys writing, reading (preferably fantasy/mystery novels), singing, advocacy, and eating good food.`],
  ['Hannah Sachse','Director of Outreach','hannah.jpg',`Hannah Sachse is a competitive athlete. She hopes to one day be a professional athlete or author and is passionate about writing and history (specifically women in history). Outside of her academics, Hannah enjoys reading, writing, journaling, watching movies and anime, building legos, and playing tennis.`],
  ['Arsema Asmelash','De Anza School Ambassador','arsema.jpg',`Arsema is passionate about aviation and enjoys learning about different cultures. She hopes to become a pilot and explore the world through travel. Outside of academics, she loves watching movies, painting, traveling, and playing the piano.`],
  ['Adrianna Cettei','West Valley School Ambassador','adrianna.jpg',`Adrianna is passionate about feminism, and she hopes to make a mark in the lives of young women through her work!`],
  ['Brianna Madrigal','Co-Director of Digital Creation','brianna.jpg',`Brianna is interested in studying oncology and biology, and she dreams of one day becoming a doctor. Outside of her academics, she enjoys singing, dancing, drawing, reading, watching movies with her brother, and playing guitar.`],
  ['Isabella Pop','Co-Director of Digital Creation','isabella.jpg',`Isabella is enthusiastic about medicine and biotechnology. Her interest in mental health and women's rights drives her involvement in women's health initiatives. In her free time, she enjoys drawing, listening to music, and writing movie reviews.`]
];
const about = `${pageHero({eyebrow:'Who we are',crumb:'Who we are',title:'A committed team behind a clear mission.',lead:'Pads for Peers works to make menstrual products accessible to students and to build a supportive, open culture around periods in schools.',image:'assets/team-group.jpg',imageAlt:'Four Pads for Peers team members holding Comfort Boxes outdoors'})}
<section class="mission section-pad"><div class="wrap mission-grid"><div><p class="eyebrow">Our mission</p><h2 class="display-heading">Comfort, access, and dignity at school.</h2></div><div class="mission-copy"><p class="large-copy">Our mission is to make comfortable and good-quality menstrual hygiene products available and accessible to students who need them.</p><p>We also work to cultivate a supportive, open culture around periods in these schools.</p>${link('what-we-do.html', 'See the program')}</div></div></section>
${impact()}
<section class="section-pad"><div class="wrap"><div class="section-top"><div><p class="eyebrow">The people behind the work</p><h2 class="display-heading">Meet the team.</h2></div><p>Co-founders, directors, and school ambassadors working toward more reliable menstrual care.</p></div><div class="people-grid">${team.map(([name,role,photo,bio])=>`<article class="person-card"><img src="assets/${photo}" alt="${name}" loading="lazy" width="165" height="210"><div class="person-card-copy"><p class="person-role">${role}</p><h3>${name}</h3><p class="person-bio">${bio}</p></div></article>`).join('')}</div></div></section>
${cta({title:'Connect with our team.',text:'Questions about the organization, the program, or ways to get involved are welcome.',href:'contact.html',label:'Get in touch',secondaryHref:'partner-with-us.html',secondaryLabel:'For schools'})}`;

const posts = [
  ['What is Period Poverty?','Aanya Aggarwal','what-is-period-poverty.html','Period equity','blog-period-poverty-hero.png','Period Poverty infographic — a hidden barrier for many menstruators'],
  ['Period Products - How To Find The Perfect Fit','Beatrice Gilbane','period-products-how-to-find-the-perfect-fit.html','Product education','findingtherightfit.png','Illustrated overview of period products'],
  ['Athletes vs. Periods: Who Will Win?','Hannah Sachse','athletes-vs-periods.html','Student experience','sportshannah.png','Athlete managing her period during training'],
  ['Why Do Periods Hurt - The Science Behind Period Cramps','Isabella Pop','why-do-periods-hurt.html','Menstrual health','thesciencebehindperiodcramps.png','Illustration about menstrual health and period cramps'],
  ['Surviving Your Period At School: 10 Tips From a High Schooler','Aanya Aggarwal','surviving-your-period-at-school.html','Student experience','blog-period-tips-hero.png','Illustrated period kit essentials including a backpack, pads, tampons, water bottle, chocolate, and a period pouch'],
  ['Periods can hurt. But how much is too much?','Tanisha Vaish','periods-can-hurt-how-much-is-too-much.html','Menstrual health','endometriosispainbias.png','Illustration representing period pain and endometriosis awareness'],
  ['Menstrual Health 101','Laya Sunkara','menstrual-health-101.html','Menstrual health','blog-menstrual-health-101-hero.png','Menstrual Hygiene 101 infographic with illustrations of menstrual products, a calendar, and reproductive health symbols'],
  ['A Letter to My Period','Aanya Aggarwal','a-letter-to-my-period.html','Personal story','blog-letter-to-my-period-hero.png','Illustration of a girl writing a letter'],
  ['Pink Tax','Laya Sunkara','pink-tax.html','Period equity','blog-pink-tax-hero.png','Pink Tax illustration showing a scale with a pink razor and dollar sign on one side and a blue razor on the other'],
  ['Debunking 10 Global Myths About Periods','Aanya Aggarwal','debunking-10-global-myths-about-periods.html','Understanding','blog-period-myths-hero.png','Pink world map with location pins marking countries where period myths persist'],
  ['Menopause Awareness Month: An Interview With Puja Taneja','Aanya Aggarwal','menopause-awareness-month-interview.html','Wellness','blog-menopause-interview-hero.png','Photo of Puja Taneja, menopause and life coach'],
  ['Before Menopause: The Transition No One Talks About','Adrianna Cettei','before-menopause-the-transition-no-one-talks-about.html','Wellness','perimenopause.png','Illustration representing perimenopause awareness'],
  ['Period Cramps','Arsema Asmelash','period-cramps.html','Menstrual health','arsemablog.png','Illustration about managing period cramps'],
];
const journal = `${pageHero({eyebrow:'The Breaking Barriers Blog',crumb:'Journal',title:'Stories and knowledge that move the conversation forward.',lead:'Articles and personal stories on menstrual health, period poverty, and wellness.'})}
<section class="section-pad"><div class="wrap"><div class="journal-heading"><p class="eyebrow">Latest reading</p><h2 class="display-heading">Explore the journal.</h2></div><div class="article-grid">${posts.map(([title,author,path,category])=>`<a class="article-card" href="blog/${path}"><span>${category}</span><h3>${title}</h3><p>By ${author}</p><strong>Read article ${arrow}</strong></a>`).join('')}</div></div></section>
<section class="resource-callout section-pad"><div class="wrap editorial-split"><div><p class="eyebrow">Go deeper</p><h2 class="display-heading">Understanding period poverty.</h2></div><div><p>Learn more about the barriers to menstrual care and explore resources from organizations and research publishers.</p>${link('period-poverty.html', 'Explore period poverty resources')}</div></div></section>`;

const periodPoverty = `${pageHero({eyebrow:'Learn more',crumb:'Period poverty',title:'Understanding the barriers to menstrual care.',lead:'Period poverty includes difficulty accessing menstrual products and the stigma that can make it harder to seek support.'})}
<section class="mission section-pad"><div class="wrap mission-grid"><div><p class="eyebrow">The issue</p><h2 class="display-heading">Access affects everyday life.</h2></div><div class="mission-copy"><p class="large-copy">When people cannot get the products they need, managing a period at school or work becomes harder.</p><p>Pads for Peers responds with school-based product access and educational resources that support more informed, open conversation.</p>${link('why-us.html', 'Why our approach matters')}</div></div></section>
<section class="resources section-pad"><div class="wrap"><div class="section-top"><div><p class="eyebrow">Further reading</p><h2 class="display-heading">Resources on period poverty.</h2></div><p>External sources listed on the original Pads for Peers resource page.</p></div><div class="resource-list">
${[
  ['UN Women — Period Poverty: Why Millions Cannot Afford Their Periods','https://www.unwomen.org/en/news-stories/explainer/2024/05/period-poverty-why-millions-of-girls-and-women-cannot-afford-their-periods'],
  ['NCBI — Research on Period Poverty','https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10372806/'],
  ['JOGHR — Period Poverty: Why It Should Be Everybody’s Business','https://www.joghr.org/article/32436-period-poverty-why-it-should-be-everybody-s-business'],
  ['Medical News Today — Period Poverty Statistics','https://www.medicalnewstoday.com/articles/period-poverty#statistics'],
  ['NCBI — Menstrual Hygiene Management Study','https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9941660/'],
  ['AMWA — Period Poverty','https://www.amwa-doc.org/period-poverty/']
].map(([title,url],i)=>`<a href="${url}" target="_blank" rel="noopener noreferrer"><span>${String(i+1).padStart(2,'0')} <em>Resource</em></span><strong>${title}</strong><span class="resource-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></div></section>
${cta({title:'Turn understanding into access.',text:'Support the Comfort Box Program or connect your school with Pads for Peers.',href:'donate.html',label:'Give today',secondaryHref:'partner-with-us.html',secondaryLabel:'For schools'})}`;

const contact = `${pageHero({eyebrow:'Get in touch',crumb:'Contact',title:'Let’s connect.',lead:'Have a question, want to bring the program to your school, or hope to contribute to the journal? Reach the right team directly.'})}
<section class="section-pad"><div class="wrap"><div class="section-top"><div><p class="eyebrow">Contact Pads for Peers</p><h2 class="display-heading">Choose where to start.</h2></div></div><div class="contact-grid">
<a href="${gmail('inquiries@padsforpeers.org')}" target="_blank" rel="noopener noreferrer"><span>General inquiries</span><h3>Questions and opportunities</h3><p>inquiries@padsforpeers.org</p><strong>Write to us ${arrow}</strong></a>
<a href="${gmail('program@padsforpeers.org')}" target="_blank" rel="noopener noreferrer"><span>School partnerships</span><h3>Bring the program to your school</h3><p>program@padsforpeers.org</p><strong>Contact the program team ${arrow}</strong></a>
<a href="${gmail('breakingbarriersblog@padsforpeers.org')}" target="_blank" rel="noopener noreferrer"><span>Journal</span><h3>Contribute to Breaking Barriers</h3><p>breakingbarriersblog@padsforpeers.org</p><strong>Contact the editors ${arrow}</strong></a>
</div><div class="social-line"><span>Follow along</span><a href="https://www.instagram.com/padsforpeers" target="_blank" rel="noopener noreferrer">@padsforpeers ${arrow}</a></div></div></section>`;

const donate = `${pageHero({eyebrow:'Support the work',crumb:'Donate',title:'Help make menstrual care available at school.',lead:'A $10 gift provides one student with one month of menstrual products. Choose a one-time contribution or ongoing support for the Comfort Box Program.'})}
<section class="section-pad"><div class="wrap donation-grid"><div class="donation-card"><p class="eyebrow">One-time gift</p><h2>Give today.</h2><p>Support free menstrual products for students through the Comfort Box Program.</p><a class="button button-solid" href="${stripeOnce}" target="_blank" rel="noopener noreferrer">Make a one-time gift ${arrow}</a></div><div class="donation-card highlighted"><p class="eyebrow light">Monthly support</p><h2>Give consistently.</h2><p>Choose the number of students you would like to support each month on the donation page.</p><a class="button button-cream" href="${stripeMonthly}" target="_blank" rel="noopener noreferrer">Become a monthly supporter ${arrow}</a></div></div></section>
<section class="mission section-pad soft-section"><div class="wrap mission-grid"><div><p class="eyebrow">Your support in context</p><h2 class="display-heading">Products, privacy, and consistency.</h2></div><div class="mission-copy"><p class="large-copy">The Comfort Box Program provides customizable monthly products through partner schools.</p><p>Students choose the products and quantities they need, and boxes are made available through a discreet school pickup process.</p>${link('what-we-do.html', 'See how the program works')}</div></div></section>`;

const pages = [
  ['index.html','Menstrual Care at School','School-based menstrual care with privacy, choice, and dignity.','home',home],
  ['what-we-do.html','Comfort Box Program','Personalized monthly menstrual product boxes delivered through partner schools.','program',program],
  ['why-us.html','Why Pads for Peers','Learn why school-based access, choice, privacy, and continuity matter.','why',why],
  ['partner-with-us.html','For Schools','Bring the Pads for Peers Comfort Box Program to your school.','schools',schools],
  ['who-we-are.html','Who We Are','Meet the Pads for Peers team and learn about our mission and impact.','about',about],
  ['blog.html','Breaking Barriers Blog','Articles and personal stories about menstrual health, period poverty, and wellness.','journal',journal],
  ['period-poverty.html','Period Poverty','Understand period poverty and explore further resources.','period',periodPoverty],
  ['contact.html','Contact','Contact Pads for Peers about the program, partnerships, and journal.','contact',contact],
  ['donate.html','Donate','Support the Pads for Peers Comfort Box Program with a one-time or monthly gift.','donate',donate],
];

for (const [filename,title,description,active,body] of pages) {
  writeFileSync(new URL(`./${filename}`, import.meta.url), shell({title,description,active,body}));
}

// Journal articles: body text lives in content/blog/, and the pages are written to blog/.
function article([title,author,path,category,image,imageAlt], i) {
  const text = readFileSync(new URL(`./content/blog/${path}`, import.meta.url), 'utf8');
  const more = [1,2,3].map(n => posts[(i + n) % posts.length]);
  return `<section class="page-hero article-hero"><div class="wrap">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="blog.html">Journal</a><span aria-hidden="true">/</span><span aria-current="page">${title}</span></nav>
    <p class="eyebrow"><span class="eyebrow-line"></span>${category}</p><h1>${title}</h1><p class="article-byline">By ${author}</p>
  </div></section>
  <article class="section-pad article-page"><div class="wrap article-layout">
    <figure class="article-image"><img src="images/${image}" alt="${imageAlt}" fetchpriority="high"></figure>
    <div class="article-body">
${text}    </div>
    <a class="underlined-link article-back" href="blog.html"><span aria-hidden="true">←</span> Back to the journal</a>
  </div></article>
  <section class="section-pad soft-section"><div class="wrap"><div class="journal-heading"><p class="eyebrow">Keep reading</p><h2 class="display-heading">More from the journal.</h2></div><div class="article-grid">${more.map(([t,a,p,c])=>`<a class="article-card" href="blog/${p}"><span>${c}</span><h3>${t}</h3><p>By ${a}</p><strong>Read article ${arrow}</strong></a>`).join('')}</div></div></section>`;
}

// Article pages are one folder down, so point every site-relative link up a level.
const upOneLevel = html => html.replace(/(href|src)="(?!https?:|mailto:|#|\/)/g, '$1="../');

posts.forEach((post, i) => {
  const [title,author,path] = post;
  const description = `${title}, by ${author}, from the Pads for Peers Breaking Barriers Blog.`;
  writeFileSync(new URL(`./blog/${path}`, import.meta.url), upOneLevel(shell({title,description,active:'journal',body:article(post,i)})));
});
console.log(`Built ${pages.length} pages and ${posts.length} articles`);
