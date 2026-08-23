export interface RansomwareFamily {
  id: string;
  name: string;
  year: number;
  severity: 'Critical' | 'Medium';
  target: string;
  country: string;
  description: string;
  mechanism: string;
  prevention: string[];
  notableAttack: string;
  pricing: 'Free' | 'Paid';
  price?: string;
  accountSummary?: string;
  exampleCompromised?: string;
  imageLinks?: string[];
  warning: boolean;
  detectionTime: number;
  dataSize: string;
  buyerRestriction: string;
  saleDate: string;
  saleDateTime: string;
  status: 'Active' | 'Soon';
  isNew?: boolean;
  logo?: string;
}

export const ransomwareData: RansomwareFamily[] = [
{
  id: 'netim',
  name: 'Netim Company',
  year: 2026,
  severity: 'Critical',
  target: 'Business / Domain Registrar',
  country: '🇫🇷 France',
  description:
  'Netim is a French domain name registrar and web hosting provider. Full compromise of internal systems — source code, infrastructure IPs, payment processing databases, customer PII, and internal business data.',
  mechanism:
  'Complete infrastructure compromise exposing source code, internal IPs, server configurations, payment processing records (PayPal, Stripe, CB), customer PII, and billing metadata.',
  prevention: ['Null'],
  notableAttack:
  'Full infrastructure compromise of Netim Company — source code, internal IPs, server configurations, payment databases (PayPal, Stripe, CB), customer PII, billing metadata, and internal business data. This is not just payment data.',
  pricing: 'Paid',
  price: '$85,000',
  exampleCompromised: `Example Transaction Records (SQL):

('14783','VIR','7','ANN','2008-04-12 10:46:00','','14.23','EUR'),
('853101','PP','6','OK','2013-03-11 08:52:00','3HC63291FT364835V','7.30','EUR'),
('881093','APM','1047','OK','2024-01-09 15:13:00','004305','28.92','EUR'),
('867508','CB','3','OK','2023-04-25 13:16:00','pi_3N0jqBKCbVAaxKsX0p4jB5mu','31.00','USD'),
('856949','PP','6','OK','2021-04-27 07:21:00','85R7629755919230C','289.00','EUR'),
('879743','APM','101','KO','2023-11-30 11:17:00','4856903332','14.40','EUR'),
('867360','CB','3','OK','2023-04-19 13:38:00','pi_3MyZLaKCbVAaxKsX1NoOeXTf','50.00','USD')

Full records include much more — not just payment data. We also have source code, IPs, server configs, customer names, emails, billing addresses, payment tokens, IPN notifications, and much more. Records span 2004-2024.`,
  warning: true,
  detectionTime: 0,
  dataSize: 'Source code, IPs, payment databases, customer PII — full infrastructure',
  buyerRestriction: 'Contact: qtox',
  saleDate: '08/25',
  saleDateTime: '2026-08-25T23:59:59-05:00',
  status: 'Active',
  isNew: true,
  logo: '/download/Paid/Netim-Compnay/logo_netim.png'
},
// {
//   id: 'wannacry',
//   name: 'WannaCry',
//   year: 2017,
//   severity: 'Critical',
//   target: 'Windows Systems (Global)',
//   country: 'Global',
//   description:
//   'A worldwide cyberattack that targeted computers running the Microsoft Windows operating system by encrypting data and demanding ransom payments in the Bitcoin cryptocurrency.',
//   mechanism:
//   'Exploited the EternalBlue vulnerability in SMBv1, allowing it to spread laterally across networks without user interaction.',
//   prevention: [
//   'Apply security patches promptly (MS17-010)',
//   'Disable SMBv1 if not required',
//   'Maintain offline backups',
//   'Use robust endpoint protection'],

//   notableAttack:
//   'National Health Service (NHS) in the UK, causing widespread disruption to hospitals.',
//   pricing: 'Paid',
//   price: '$2,500',
//   warning: true,
//   detectionTime: 120,
//   dataSize: '~500GB Compressed, full system dump',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-07T12:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'ryuk',
//   name: 'Ryuk',
//   year: 2018,
//   severity: 'Critical',
//   target: 'Enterprise & Government',
//   country: 'USA',
//   description:
//   'A sophisticated ransomware family known for "big game hunting" - targeting large organizations capable of paying massive ransoms.',
//   mechanism:
//   'Typically deployed after an initial infection by Emotet or TrickBot. It disables antivirus software and encrypts network drives and local files.',
//   prevention: [
//   'Implement network segmentation',
//   'Use multi-factor authentication (MFA)',
//   'Monitor for TrickBot/Emotet indicators',
//   'Secure RDP endpoints'],

//   notableAttack:
//   'Multiple US municipalities and large newspaper printing facilities.',
//   pricing: 'Paid',
//   price: '$5,000',
//   warning: true,
//   detectionTime: 180,
//   dataSize: '~350GB Compressed, network backups',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-07T14:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'lockbit',
//   name: 'LockBit',
//   year: 2019,
//   severity: 'Critical',
//   target: 'Corporate Networks',
//   country: 'Global',
//   description:
//   'Operates on a Ransomware-as-a-Service (RaaS) model. Known for its fast encryption speed and double extortion tactics.',
//   mechanism:
//   'Self-spreading malware that uses automated processes to rapidly compromise target networks once inside.',
//   prevention: [
//   'Audit and secure remote access tools',
//   'Implement principle of least privilege',
//   'Regularly test backup restoration',
//   'Conduct employee phishing training'],

//   notableAttack: 'Accenture and various global manufacturing firms.',
//   pricing: 'Paid',
//   price: '$3,000',
//   warning: true,
//   detectionTime: 90,
//   dataSize: '~200GB Compressed, corporate data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-07T16:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'cryptolocker',
//   name: 'CryptoLocker',
//   year: 2013,
//   severity: 'Critical',
//   target: 'Windows PCs',
//   country: 'USA',
//   description:
//   'One of the first modern ransomware trojans that popularized the use of strong RSA public-key cryptography to hold files hostage.',
//   mechanism:
//   'Spread primarily through malicious email attachments (often disguised as tracking notifications) and the Gameover ZeuS botnet.',
//   prevention: [
//   'Email filtering and attachment scanning',
//   'User education on suspicious emails',
//   'Regular automated backups',
//   'Software restriction policies'],

//   notableAttack:
//   'Infected over 250,000 systems globally before its botnet was taken down.',
//   pricing: 'Paid',
//   price: '$1,500',
//   warning: false,
//   detectionTime: 240,
//   dataSize: '~150GB Compressed, personal files',
//   buyerRestriction: '[MULTIPLE BUYERS ALLOWED]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-07T18:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'revil',
//   name: 'REvil (Sodinokibi)',
//   year: 2019,
//   severity: 'Critical',
//   target: 'Managed Service Providers (MSPs)',
//   country: 'Russia',
//   description:
//   'A highly prolific RaaS operation that pioneered the double extortion technique (encrypting files and threatening to leak stolen data).',
//   mechanism:
//   'Exploited vulnerabilities in remote management tools and VPN gateways to gain access to MSPs and their clients.',
//   prevention: [
//   'Patch edge devices and VPNs immediately',
//   'Strict vendor risk management',
//   'Implement zero trust architecture',
//   'Monitor data exfiltration anomalies'],

//   notableAttack:
//   'Kaseya VSA supply chain attack affecting thousands of businesses.',
//   pricing: 'Paid',
//   price: '$10,000',
//   warning: true,
//   detectionTime: 150,
//   dataSize: '~400GB Compressed, MSP client data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-07T20:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'petya',
//   name: 'Petya / NotPetya',
//   year: 2016,
//   severity: 'Critical',
//   target: 'Global Infrastructure',
//   country: 'Ukraine',
//   description:
//   'Initially ransomware, later variants (NotPetya) acted as a wiper, destroying data permanently under the guise of ransomware.',
//   mechanism:
//   "Infects the Master Boot Record (MBR) to encrypt the entire hard drive's file system table, preventing Windows from booting.",
//   prevention: [
//   'Network segmentation',
//   'Restrict administrative privileges',
//   'Update systems to prevent lateral movement',
//   'Maintain immutable backups'],

//   notableAttack:
//   'Maersk and global shipping/logistics infrastructure in 2017.',
//   pricing: 'Free',
//   warning: true,
//   detectionTime: 60,
//   dataSize: '~600GB Compressed, infrastructure data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-07T22:00:00-05:00',
//   status: 'Soon'
// },
// {
//   id: 'conti',
//   name: 'Conti',
//   year: 2020,
//   severity: 'Critical',
//   target: 'Healthcare & Enterprise',
//   country: 'Russia',
//   description:
//   'A ruthless RaaS operation run like a corporation, infamous for attacking healthcare and emergency services with rapid, double-extortion attacks.',
//   mechanism:
//   'Gained initial access via phishing and exposed RDP, then used Cobalt Strike for lateral movement before deploying multithreaded encryption.',
//   prevention: [
//   'Block malicious macro execution',
//   'Deploy EDR with behavioral detection',
//   'Segment critical healthcare systems',
//   'Enforce MFA on all remote access'],

//   notableAttack:
//   'The Health Service Executive (HSE) of Ireland, crippling national healthcare IT.',
//   pricing: 'Paid',
//   price: '$8,000',
//   warning: true,
//   detectionTime: 200,
//   dataSize: '~450GB Compressed, healthcare records',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-08T00:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'darkside',
//   name: 'DarkSide',
//   year: 2020,
//   severity: 'Critical',
//   target: 'Critical Infrastructure',
//   country: 'Russia',
//   description:
//   'A RaaS group that branded itself with a code of conduct, responsible for one of the most disruptive infrastructure attacks in US history.',
//   mechanism:
//   'Used compromised VPN credentials for entry, then encrypted systems while exfiltrating data for leverage.',
//   prevention: [
//   'Decommission unused VPN accounts',
//   'Rotate and monitor credentials',
//   'Isolate OT from IT networks',
//   'Maintain tested incident response plans'],

//   notableAttack:
//   'Colonial Pipeline, triggering fuel shortages across the US East Coast.',
//   pricing: 'Paid',
//   warning: true,
//   detectionTime: 175,
//   dataSize: '~300GB Compressed, energy sector data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-08T02:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'blackcat',
//   name: 'BlackCat (ALPHV)',
//   year: 2021,
//   severity: 'Critical',
//   target: 'Enterprise (Cross-platform)',
//   country: 'Russia',
//   description:
//   'One of the first major ransomware families written in Rust, enabling fast cross-platform attacks against Windows, Linux, and ESXi.',
//   mechanism:
//   'Highly configurable payload using stolen credentials and triple-extortion (encryption, leak, and DDoS threats).',
//   prevention: [
//   'Harden ESXi and hypervisor access',
//   'Monitor for unusual Rust binaries',
//   'Limit lateral movement with segmentation',
//   'Continuous credential hygiene'],

//   notableAttack:
//   'MGM Resorts and Western Digital, causing major operational outages.',
//   pricing: 'Paid',
//   price: '$7,500',
//   warning: true,
//   detectionTime: 130,
//   dataSize: '~250GB Compressed, hospitality data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-08T04:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'maze',
//   name: 'Maze',
//   year: 2019,
//   severity: 'Critical',
//   target: 'Corporate Enterprise',
//   country: 'USA',
//   description:
//   'The pioneer of the modern "name and shame" leak-site model, combining data theft with encryption to pressure victims.',
//   mechanism:
//   'Distributed via exploit kits and phishing, exfiltrating data before encrypting to threaten public release.',
//   prevention: [
//   'Monitor outbound data transfers',
//   'Block known exploit-kit domains',
//   'Encrypt sensitive data at rest',
//   'Maintain offline, versioned backups'],

//   notableAttack:
//   'Cognizant and Canon, exposing the era of public data-leak extortion.',
//   pricing: 'Paid',
//   price: '$4,000',
//   warning: true,
//   detectionTime: 160,
//   dataSize: '~280GB Compressed, enterprise data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-08T06:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'clop',
//   name: 'Clop',
//   year: 2019,
//   severity: 'Critical',
//   target: 'Managed File Transfer Systems',
//   country: 'Russia',
//   description:
//   'A prolific group specializing in mass-exploitation of zero-day vulnerabilities in file-transfer software for large-scale data theft.',
//   mechanism:
//   'Exploited zero-days in MOVEit and GoAnywhere to steal data from hundreds of organizations simultaneously.',
//   prevention: [
//   'Patch file-transfer software immediately',
//   'Restrict internet-facing transfer apps',
//   'Audit third-party data exposure',
//   'Deploy web application firewalls'],

//   notableAttack:
//   'The MOVEit Transfer breach impacting thousands of organizations worldwide.',
//   pricing: 'Paid',
//   price: '$6,000',
//   warning: true,
//   detectionTime: 110,
//   dataSize: '~380GB Compressed, file transfer data',
//   buyerRestriction: '[1 BUYER ONLY - WE SHRED ON OUR END]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-08T08:00:00-05:00',
//   status: 'Active'
// },
// {
//   id: 'cerber',
//   name: 'Cerber',
//   year: 2016,
//   severity: 'Medium',
//   target: 'Home & SMB Users',
//   country: 'USA',
//   description:
//   'A widely distributed RaaS that introduced features like offline encryption and a distinctive audio ransom message.',
//   mechanism:
//   'Spread through phishing campaigns and exploit kits, encrypting files even without an internet connection.',
//   prevention: [
//   'Use reputable email filtering',
//   'Keep browsers and plugins updated',
//   'Regularly back up personal files',
//   'Run modern antivirus protection'],

//   notableAttack:
//   'One of the most distributed ransomware families of 2016 via spam botnets.',
//   pricing: 'Free',
//   warning: false,
//   detectionTime: 300,
//   dataSize: '~100GB Compressed, SMB data',
//   buyerRestriction: '[MULTIPLE BUYERS ALLOWED]',
//   saleDate: '08/07',
//   saleDateTime: '2024-08-08T10:00:00-05:00',
//   status: 'Soon'
// },
// {
//   id: 'sfic',
//   name: 'Strategy First International College',
//   year: 2026,
//   severity: 'Critical',
//   target: 'Education Sector',
//   country: 'Myanmar',
//   description:
//   'Normal Hunters operation compromising Strategy First International College (SFIC) student accounts, exposing personal information, academic records, and financial data.',
//   mechanism:
//   'Targeted attack exploiting vulnerabilities in student information system, potentially through phishing campaigns or credential stuffing against staff accounts.',
//   prevention: ['Null'],
//   notableAttack:
//   'Compromise of student accounts leading to potential identity theft and academic fraud.',
//   pricing: 'Free',
//   price: '$0',
//   warning: true,
//   detectionTime: 50,
//   dataSize: '~400++ student accounts and academic records',
//   buyerRestriction: 'Null',
//   saleDate: 'Null',
//   saleDateTime: 'Null',
//   status: 'Active'
// },
{
  id: 'jobnet',
  name: 'Job Net .COM.MM',
  year: 2026,
  severity: 'Critical',
  target: 'Business',
  country: 'Myanmar',
  description:
  'Normal Hunters operation compromising Job Net .COM.MM business data, exposing corporate information, user accounts, and business operations data.',
  mechanism:
  'Targeted attack exploiting vulnerabilities in business management systems, potentially through phishing campaigns or credential stuffing against administrative accounts.',
  prevention: ['null'],
  notableAttack:
  'Compromise of user accounts leaking sensitive user data and cv information.',
  pricing: 'Free',
  price: '$0',
  accountSummary: `Total Account
Category	Count
Total Entries (Accounts)	2,000
.com.mm Domains	595
Other Domains	1,405

Domain Breakdown (Other Domains)
Domain Type	Count (Approx.)
job.jobnet.dk	~950
www.jobnet.co.il	~250
m.jobnet.co.il	~60
agent.jobnet.co.il	~40
jobnet.com.mm	~30
jobnet.co.il	~20
jobnet.dk	~15
jobnet.id	~8
jobnet.nl	~6
jobnet.se	~3
jobnet.com.vn	~3
jobnet.com.tw	~5
Other (jobnet.com.au, jobnet.ch, jobnet.com.gt, etc.)	~15`,
  imageLinks: [
    '/example/job-net.com.mm/jn-01.jpg',
    '/example/job-net.com.mm/jn-02.jpg',
    '/example/job-net.com.mm/jn-03.jpg',
    '/example/job-net.com.mm/jn-04.jpg',
    '/example/job-net.com.mm/jn-05.jpg'
  ],
  warning: true,
  detectionTime: 60,
  dataSize: '~500++ user accounts and cv information',
  buyerRestriction: '[Null]',
  saleDate: 'Null',
  saleDateTime: 'Null',
  status: 'Active'
},
{
  id: 'indo-polic',
  name: 'Indonesian Police Database',
  year: 2026,
  severity: 'Critical',
  target: 'Government / Law Enforcement',
  country: 'Indonesia',
  description:
  'Database containing records of 52,000 Indonesian police officers including email addresses, phone numbers, first and last names, passwords, location details, and 4,000 facial photographs.',
  mechanism:
  'Compromised internal police records system exposing officer PII, credentials, biometric data, and device tokens.',
  prevention: ['Null'],
  notableAttack:
  'Mass exposure of 52,000 Indonesian police officer records with facial photographs and credentials.',
  pricing: 'Paid',
  price: '$550 - $2,350',
  warning: false,
  detectionTime: 0,
  dataSize: '52,000 officer records + 4,000 facial photos',
  buyerRestriction: '[Negotiable - ETH/BTC/XMR accepted]',
  saleDate: 'Null',
  saleDateTime: 'Null',
  status: 'Active'
},
{
  id: 'delhi-du',
  name: 'The University of Delhi (DU)',
  year: 2026,
  severity: 'Critical',
  target: 'Education Sector',
  country: '\u{1F1EE}\u{1F1F3} India',
  description:
  'The University of Delhi (DU) is a major public university in New Delhi, India, founded in 1922. It is one of India\'s most well-known universities, offering undergraduate, postgraduate, and doctoral programs across subjects like science, arts, commerce, law, and technology.',
  mechanism:
  'Compromised internal university records system exposing student PII, academic records, enrollment data, personal identification documents, and contact information.',
  prevention: ['Null'],
  notableAttack:
  'LidaBroker & DYSPHOR1A breached the University of Delhi and are selling the full database of student records.',
  pricing: 'Paid',
  price: '$450',
  exampleCompromised: `Comprimised Fields: id, form_id, status, applied_on, titre, prenom, nom, name, mobile, enrolment, membership, department, course, completion, uni_email, wifi_email, other_accounts, rejection_reason, photo_file, id_front_file, id_back_file, photo_url, id_front_url, id_back_url

Sample Records:

ID 3: Mr. Ripunjay Kumar Thakur | Dept: History | M.PHIL. HISTORY | Mobile: 9555399751 | Enrollment: RC-664/10
ID 5: Ms. Gunjan Bansal | Dept: Operational Research | PH.D. OPERATIONAL RESEARCH | Mobile: 9953204988 | Email: gunjan.1512@gmail.com
ID 8: Mrs. Neelam Arya | Dept: Establishment Branch-I | Mobile: 9560959242 | Email: neelamarya375@gmail.com
ID 6: Mr. Rajan | Dept: Punjabi | M.PHIL. PUNJABI | Mobile: 9555767094 | Email: Depttofpunjabi@gmail.com
ID 7: Mr. SHIVA SRIVASTAVA | Dept: Education | M.PHIL. EDUCATION | Mobile: 8743059593
ID 2: Ms. Km preeti Mishra | Dept: Hindi | PH.D. HINDI | Mobile: 9319473347`,
  warning: false,
  detectionTime: 0,
  dataSize: 'Student records with PII, academic data, and identification documents',
  buyerRestriction: '[NEGOTIABLE - ETH/BTC/XMR ACCEPTED]',
  saleDate: 'Null',
  saleDateTime: 'Null',
  status: 'Active'
},
{
  id: 'gusto-glms',
  name: 'GUSTO College GLMS',
  year: 2026,
  severity: 'Medium',
  target: 'Education Sector',
  country: '\u{1F1F2}\u{1F1F2} Myanmar',
  description:
  'Compromised user accounts from GUSTO College\'s GLMS (Global Learning Management System). Exposed user credentials from the Moodle platform at gusto-education.com.',
  mechanism:
  'Exposed user accounts discovered on the GUSTO College GLMS Moodle platform. Credentials and account data leaked.',
  prevention: ['Null'],
  notableAttack:
  'Leak of user accounts from GUSTO College GLMS Moodle platform.',
  pricing: 'Free',
  price: '$0',
  warning: false,
  detectionTime: 0,
  dataSize: 'User account credentials',
  buyerRestriction: 'Null',
  saleDate: 'Null',
  saleDateTime: 'Null',
  status: 'Active'
},
{
  id: 'ayudhya',
  name: 'AYUDHYA TH Insurance',
  year: 2026,
  severity: 'Critical',
  target: 'Financial / Insurance',
  country: 'Thailand',
  description:
  'Leaked data from AYUDHYA (TH Insurance / Allianz Thailand). Internal batch-control system used within the financial/transaction batch-processing ecosystem behind the Allianz customer-facing web platform. Includes admin credentials (TBH2CASH:AAbb1234).',
  mechanism:
  'Compromised internal batch-control system for insurance transaction processing. Root endpoints at Allianz Thailand health provider portal exposed.',
  prevention: ['Null'],
  notableAttack:
  'Full leak of AYUDHYA TH Insurance internal systems including Allianz Thailand health provider portal access.',
  pricing: 'Free',
  price: '$0',
  warning: false,
  detectionTime: 0,
  dataSize: 'Internal batch-control system + admin credentials',
  buyerRestriction: 'Null',
  saleDate: 'Null',
  saleDateTime: 'Null',
  status: 'Active'
},
{
  id: 'yoma-fleet',
  name: 'Yoma Fleet',
  year: 2026,
  severity: 'Critical',
  target: 'Business / Vehicle Leasing',
  country: '\u{1F1F2}\u{1F1F2} Myanmar',
  description:
  'Yoma Fleet is a leading vehicle operating lease, rental, and financing company based in Yangon, Myanmar. The platform provides centralized administration and management for vehicle orders, employee financing, repayments, users, and employee records. Admin account access — need to contact on Telegram.',
  mechanism:
  'Compromised admin panel exposing full operational data including user information, order details, repayment records, and employee management systems.',
  prevention: ['Null'],
  notableAttack:
  'Full admin access to Yoma Fleet platform including order management, repayments, users, and employee records with exported CSV datasets.',
  pricing: 'Free',
  price: '$0',
  imageLinks: [
    '/download/Free/yoma-fleet/Example Photo/All Orders.png',
    '/download/Free/yoma-fleet/Example Photo/Incude Order Details.png',
    '/download/Free/yoma-fleet/Example Photo/User Managemnt Single User Account.png'
  ],
  warning: false,
  detectionTime: 0,
  dataSize: 'Orders, users, repayments, employees — full admin export',
  buyerRestriction: 'Null',
  saleDate: 'Null',
  saleDateTime: 'Null',
  status: 'Active',
  logo: '/download/Free/yoma-fleet/yomafleet-logo.webp'
}];