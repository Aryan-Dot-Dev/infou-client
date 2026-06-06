import { writeFileSync } from "fs";
import { join } from "path";

const rawSchemesList = `Startup India Initiative
Startup India Seed Fund Scheme (SISFS)
Credit Guarantee Scheme for Startups (CGSS)
Fund of Funds for Startups (FFS)
Startup India Fund of Funds 2.0
TIDE 2.0
SAMRIDH Startup Accelerator
Digital India Bhashini
Future Skills PRIME
Chips to Startup (C2S)
GENESIS Program (MeitY)
NIDHI Prayas
NIDHI EIR
NIDHI Seed Support
Technology Business Incubators
SERB Grants
SAIF Facilities
Research Development & Innovation (RDI) Scheme
DST Multiplier & Collaborative R&D Grants
National Deep Tech Startup Policy (NDTSP)
IndiaAI Mission – National Program on Artificial Intelligence
STPI + C-DOT Samarth Incubation Program
Atal Innovation Mission (AIM)
BIG Grant
SBIRI
PACE
BioNEST Incubation
Seed Fund for Bio Startups
PMEGP
CLCSS
ZED Certification
MSME Champions Scheme
MSME Incubation Scheme
SFURTI
TREAD for Women
RKVY-RAFTAAR
Agri Clinics & Agribusiness Centres
NABARD Startup & Innovation Fund
Digital Agriculture Mission
PM-PRANAM
Pradhan Mantri Matsya Sampada Yojana (PMMSY)
iDEX
DRDO Technology Development Fund
IN-SPACe Seed Fund
Stand-Up India
Mahila E-Haat
DAY-NRLM Startup Grants
ONGC Startup Fund
BHEL Innovation Challenge
IOCL Startup Scheme
BPCL Ankur Fund
NTPC Startup Incubation
Startup Village Entrepreneurship Programme (SVEP)
Skill India Digital
PMKVY
PM-SETU
PM-DAKSH
FAME I & II
PLI for Auto & EV
ACC Battery Scheme
PM E-DRIVE
Export Promotion Capital Goods (EPCG)
Market Access Initiative (MAI)
Trade Infrastructure for Export Scheme (TIES)
Remission of Duties and Taxes on Exported Products (RoDTEP)
PM-AJAY
SMILE Scheme
Atal Vayo Abhyuday Yojana (AVYAY)
Credit Enhancement Guarantee Scheme for SCs
NSKFDC
NSFDC
SEED Scheme for DNTs
NAMASTE
Urban Challenge Fund (UCF)
Gramin Rozgar Mission (GARIMA)
PM Surya Ghar: Muft Bijli Yojana
PM-KUSUM
National Bio Energy Programme - Biogas
National Bio Energy Programme - Biomass
Grid Connected Rooftop Solar Programme Phase-II
Carbon Credit Trading Scheme 2023
PLI Scheme for IT Hardware 2.0
PLI Scheme for Textiles
PLI Scheme for Specialty Steel
PLI Scheme for Pharmaceuticals
PLI for Domestic Manufacturing of KSMs/APIs
PLI for Medical Devices
PLISFPI
Scheme for Strengthening of Pharmaceuticals Industry (SPI)
PRIP Scheme
Ayushman Bharat PM-JAY
National Action Plan for Drug Demand Reduction
PM Awaas Yojana - Urban (PMAY-U)
PM Gramin Awas Yojana (PMAY-G)
Mission Mausam
Deep Ocean Mission
PM-JANMAN
Gyan Bharatam Mission
Modified UDAN Scheme
Anusandhan National Research Foundation (ANRF)
Haryana State Start-ups Scheme
PADMA Scheme
Mukhya Mantri Antyodaya Parivar Utthan Yojana (MMAPUY)
State Mini Cluster Development Scheme
Critical Infrastructure Development Scheme
Industrial Infrastructure Development Scheme
HUM Registration
Pradhan Mantri Mudra Yojana (PMMY)
CGTMSE (Credit Guarantee Fund Trust for MSEs)
SIDBI SMILE Scheme
NSIC Credit Support Scheme
NSIC Raw Material Assistance Scheme
NSIC Marketing Support Scheme
Mahila Udyam Nidhi Scheme (SIDBI)
SIDBI Direct Credit Scheme
Equipment Finance for MSMEs (SIDBI)
Working Capital Loan Scheme (SIDBI)
Udyam Registration Portal
GeM Onboarding for MSMEs
BIS Certification Scheme
FSSAI Licensing & Registration
DPIIT Recognition for Startups
MEIS (Merchandise Exports from India Scheme)
SEIS (Service Exports from India Scheme)
Interest Equalization Scheme on Export Credit
ECGC Export Credit Guarantee Schemes
Export Credit Insurance for Banks (ECIB)
Transport & Marketing Assistance (TMA)
SAMPADA Scheme (Food Processing)
PM Kisan Sampada Yojana
Operation Greens
Cold Chain Infrastructure Scheme
Textile Upgradation Fund Scheme (TUFS)
SAMARTH Scheme for Textiles
National Handloom Development Programme (NHDP)
PM Mega Integrated Textile Region and Apparel (PM MITRA)
Powertex India Scheme
Integrated Wool Development Programme
Modified Electronics Manufacturing Clusters (EMC 2.0)
Design Linked Incentive (DLI) Scheme
Scheme for Promotion of Manufacturing of Electronic Components (SPECS)
STPI Software Technology Park Incentives
ESDM – Electronic System Design and Manufacturing Scheme
Pradhan Mantri Rozgar Protsahan Yojana (PMRPY)
Deen Dayal Antyodaya Yojana - Urban (DAY-NULM)
Annapurna Scheme
Stree Shakti Package for Women Entrepreneurs
Cent Kalyani Scheme (Central Bank)
National Backward Classes Finance & Dev Corporation (NBCFDC)
National Minorities Development & Finance Corp (NMDFC)
Pradhan Mantri SVANidhi (PM Street Vendor Loan)
Self Employment Scheme for Rehabilitation of Manual Scavengers (SRMS)
DAY-NRLM – Deendayal Antyodaya Yojana (Rural)
PMEGP via Khadi & Village Industries Commission
National Rural Livelihood Mission (NRLM)
Rashtriya Gram Swaraj Abhiyan (RGSA)
ULIP – Unified Logistics Interface Platform
PM GatiShakti National Master Plan
Logistics Efficiency Enhancement Programme (LEEP)
Sagarmala Programme
Bharatmala Pariyojana
AMRUT 2.0
National Water Mission
Jal Jeevan Mission
DigiLocker
e-RUPI Scheme
ONDC (Open Network for Digital Commerce)
Account Aggregator Framework
IndiaStack Initiatives
Section 80IAC – Tax Exemption for Startups
Angel Tax Exemption for DPIIT Startups
MSME Delayed Payment Portal (MSME SAMADHAAN)
MSME SAMBANDH (Public Procurement Portal)
Startup IP Protection – Fast Track Patent Examination
SIPP Scheme (Startup Intellectual Property Protection)
Design Registration Facilitation for Startups
GI Tag – Geographical Indications Registry
ISRO Start-up Policy & Technology Transfer
DRDO CEPTAM Scheme
Defence India Startup Challenge (DISC) – iDEX
Innovations for Defence Excellence (iDEX4Fauji)
Ayushman Bharat Digital Mission (ABDM)
National Health Mission (NHM) Innovation Fund
PM Ayushman Bharat Health Infrastructure Mission
National Apprenticeship Promotion Scheme (NAPS)
PM YASASVI Scholarship
Pradhan Mantri Uchchatar Shiksha Protsahan (PM-USP)
National Scholarship Portal (NSP)
Van Dhan Vikas Kendra (VDVK)
Tribal Innovation & Entrepreneurship Fund (TIEF)
North East Venture Fund (NEVF)
NE Development Finance Corporation (NEDFi)
North East Industrial Development Scheme (NEIDS)
Venture Capital Fund for Scheduled Castes (VCFSC)
Jan Dhan Yojana (PMJDY)
Sukanya Samriddhi Yojana
Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)
Pradhan Mantri Suraksha Bima Yojana (PMSBY)
Atal Pension Yojana
BIRAC BioAngels Network
NSTEDB Entrepreneurship Awareness Camps
Atal Tinkering Labs (ATL)
Mission Innovation India
Smart Cities Mission
National Innovation Foundation (NIF) Grants
Green India Mission
Faster Adoption of Manufacturing of Hybrid and Electric Vehicles (FAME)
National Clean Energy Fund (NCEF)
MNRE Off-grid Solar Power Schemes
Karnataka Startup Policy
KDEM Elevate Programme
Maharashtra State Innovation Society
Maha Startup Scheme
Tamil Nadu Startup & Innovation Policy
EDII Tamil Nadu Incubation Scheme
Gujarat Startup Policy
iCreate – International Centre for Entrepreneurship and Technology
UP Startup Policy & One District One Product (ODOP)
UP MSME and Export Promotion Council Schemes
Rajasthan Startup & MSME Policy
T-Hub Foundation Incubation
WE-Hub Women Entrepreneurship Program
AP Innovation Society & APEX Incubation
Kerala Startup Mission (KSUM)
Delhi Startup Policy
Fisheries and Aquaculture Infrastructure Development Fund (FIDF)
Blue Revolution – Neela Kranti
Emergency Credit Line Guarantee Scheme (ECLGS)
Credit Guarantee Fund for Micro Units (CGFMU)
RBI Regulatory Sandbox for Fintech
SEBI Innovation Sandbox
SIDBI Make in India Soft Loan Fund (SMILE)
NSIC Bill Discounting Scheme
Jan Samarth Portal – Unified Credit Scheme Portal
Duty Drawback Scheme
Advance Authorization Scheme
Special Economic Zone (SEZ) Scheme
Export Oriented Unit (EOU) Scheme
Software Technology Park (STP) Scheme
One District One Product (ODOP) Export Scheme
Interest Subvention Scheme for MSMEs on Post Shipment Credit
ECGC MSME Export Scheme
PM Fasal Bima Yojana (PMFBY)
PM Kisan Samman Nidhi (PM-KISAN)
National Mission for Sustainable Agriculture (NMSA)
Paramparagat Krishi Vikas Yojana (PKVY) – Organic Farming
Sub-Mission on Agricultural Mechanisation (SMAM)
National Beekeeping & Honey Mission (NBHM)
Micro Irrigation Fund (MIF) – NABARD
Agricultural Infrastructure Fund (AIF)
Formation and Promotion of FPOs Scheme
National Agriculture Market (e-NAM)
PM Annadata Aay Sanrakshan Abhiyan (PM-AASHA)
National Food Security Mission (NFSM)
Agri Export Zones (AEZ)
Interest Subvention Scheme for Short Term Credit to Farmers
Kisan Credit Card (KCC) for Farmers
Kisan Credit Card for Fisheries & Animal Husbandry
National Scheme on Welfare of Fishermen
Aquaculture Development Scheme (MPEDA)
Mission for Integrated Development of Horticulture (MIDH)
National Horticulture Mission (NHM)
Horticulture Cluster Development Programme (CDP)
National Horticulture Board (NHB) Schemes
Micro & Small Enterprises Cluster Development Programme (MSE-CDP)
National SC/ST Hub
MSME Competitive (LEAN) Scheme
Digital MSME Scheme
Udyam Assist Platform (UAP) for Informal Sector
Raising and Accelerating MSME Performance (RAMP)
Champions Portal for MSME Grievance Resolution
National Technical Textiles Mission (NTTM)
Amended Technology Upgradation Fund Scheme (ATUFS)
Integrated Processing Development Scheme (IPDS)
Scheme for Integrated Textile Parks (SITP)
Handloom Weavers Comprehensive Welfare Scheme
Workshed Scheme for Handloom Weavers
Yarn Supply Scheme for Handloom Weavers
MUDRA Loan for Weavers (Weaver MUDRA Scheme)
Raw Material Supply Scheme (RMSS) for Handlooms
Handicrafts Artisan Comprehensive Welfare Scheme
IndiaAI Compute Initiative
Cyber Security Centre of Excellence (CCoE)
MeitY Startup Hub (MSH)
National Supercomputing Mission (NSM)
BharatNet Broadband Infrastructure
PM-WANI (WiFi Access Network Interface)
National Quantum Mission
Semicon India Programme
National Green Hydrogen Mission
Solar Parks & Ultra Mega Solar Power Projects
Small Hydro Power Programme
National Wind-Solar Hybrid Policy
Offshore Wind Energy Policy
Perform Achieve and Trade (PAT) Scheme
UJALA Scheme – Unnat Jyoti by Affordable LEDs
Standards & Labelling Programme (BEE)
National Mission for Enhanced Energy Efficiency (NMEEE)
National Digital Health Mission (NDHM)
Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)
National AYUSH Mission
Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)
Medical Devices Park Scheme
Bulk Drug Parks Scheme
National Tele Mental Health Programme (Tele-MANAS)
PM SHRI Schools (PM Schools for Rising India)
Institutes of Eminence (IoE) Scheme
IMPRINT India (Impacting Research Innovation and Technology)
Global Initiative for Academic Networks (GIAN)
SWAYAM Free Online Education Platform
Pradhan Mantri Research Fellows (PMRF) Scheme
SWAYAM PRABHA DTH Channels for Education
Make in India for Defence (MII Defence)
DRDO Technology Transfer to Industry
Atmanirbhar Bharat Defence Production Policy
DSIR Recognition for In-house R&D Units
Atal Mission for Rejuvenation and Urban Transformation (AMRUT 1.0)
National Urban Livelihood Mission (NULM)
HRIDAY – Heritage City Development and Augmentation Yojana
National Industrial Corridor Programme (NICP)
Delhi Mumbai Industrial Corridor (DMIC)
Viability Gap Funding (VGF) for PPP Projects
Swadesh Darshan Scheme 2.0
PRASAD Scheme – Pilgrimage Rejuvenation
Hunar Se Rozgar Tak (HSRT) Scheme
Homestay Scheme for Rural Tourism
Medical & Wellness Tourism Policy
National Mineral Exploration Trust (NMET) Grants
PM Khanij Kshetra Kalyan Yojana (PMKKKY)
District Mineral Foundation (DMF) Support
Geological Survey of India (GSI) Startup Mineral Exploration
Pradhan Mantri Matru Vandana Yojana (PMMVY)
Beti Bachao Beti Padhao (BBBP)
One Stop Centre Scheme (Sakhi)
Support to Training & Employment Programme (STEP)
Mission Shakti – Women Safety & Empowerment
Pradhan Mantri Ujjwala Yojana (PMUY)
TRIFED Schemes for Tribal Enterprises
Pradhan Mantri Van Dhan Yojana
Mechanism for Marketing of Minor Forest Produce (MFP)
Eklavya Model Residential Schools (EMRS)
MedTech Regulatory Sandbox (CDSCO)
Central Drugs Standard Control Organisation Fast Track
Multimodal Logistics Park (MMLP) Scheme
Dedicated Freight Corridor (DFC) Industry Linkage
LEEP – Logistics Ease Across Different States
Punjab Startup and Entrepreneurship Policy
Invest Punjab – Business First Portal
MP Startup Policy & Yuva Udyami Yojana
MP MSME Development Policy
Odisha Startup Policy & iStart Odisha
MSME Development Policy Odisha
West Bengal Startup Policy
Bengal Silicon Valley Startup Hub
Jharkhand Startup Policy
Assam Startup – Nidhi Program
Bihar Startup Policy
HP Startup Yojana & HIMSTART
CG Startup Policy & Nava Raipur Innovation City
Goa Startup Policy
Uttarakhand Startup Policy & SIDCUL Incubation
J&K New Industrial Development Scheme (J&K NIDS)
StartUp J&K Initiative
Technology Innovation Hub (TIH) – DST
National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)
National Biopharma Mission
Startup India Innovation Week Challenge
Centre for Nano Science and Engineering (CeNSE) Grants
Space Technology Incubation Centre (S-TIC) – ISRO
IIT Technology Business Incubators (TBIs)
NIT Innovation & Entrepreneurship Development Centre
NASSCOM 10000 Startups Programme
STPI Centres of Entrepreneurship (CoE)
IIM Ahmedabad CIIE.CO – Bharat Inclusion Initiative
SIDBI Startup Mitra – Incubation Portal
Atal Bhujal Yojana (Groundwater Management)
Swachh Bharat Mission – Urban 2.0
Swachh Bharat Mission – Gramin Phase II
GOBAR-DHAN Scheme
Affordable Rental Housing Complexes (ARHC) Scheme
Light House Projects (LHP) for Affordable Housing
NFDC Production Grants
Film Facilitation Office (FFO) – Single Window Clearance
AVGC-XR Policy (Animation, VFX, Gaming, Comics)
Ambedkar Hastshilp Vikas Yojana
Design & Technical Upgradation Scheme for Handicrafts
Marketing Support & Services for Handicrafts
Export Promotion for Handicrafts (EPCH)
National Centre for Textile Design (NCTD)
PLI for Telecom & Networking Products
Digital Communications Innovation Square (DCIS)
Telecom Technology Development Fund (TTDF)
5G Use Case Labs & Testbeds Initiative
Universal Service Obligation Fund (USOF) Schemes
Khelo India – Sport Tech Fund
Target Olympic Podium Scheme (TOPS)
National Sports Development Fund (NSDF)
Sports Authority of India (SAI) Training Grants
MSME IP Facilitation Centre
Traditional Knowledge Digital Library (TKDL)
National IPR Policy 2016 Implementation Schemes
MSME Pre-Pack Insolvency Resolution Process (PPIRP)
Ease of Doing Business – BizReform App
Shram Suvidha Portal – Labour Compliance
NCLT Fast Track Insolvency for MSMEs
Mega Food Parks Scheme
Integrated Cold Chain and Value Addition Infrastructure
Scheme for Agro-Marine Processing & Development (SAMPADA)
Food Safety & Standards Authority of India (FSSAI) Compliance Support
Animal Husbandry Infrastructure Development Fund (AHIDF)
PM Matsya Kisan Samridhi Sah-Yojana (PM-MKSSY)
National Livestock Mission (NLM)
National Programme for Dairy Development (NPDD)
Dairy Processing & Infrastructure Development Fund (DIDF)
Rashtriya Gokul Mission
National Cooperative Development Corporation (NCDC) Grants
Cooperative Societies Credit Support Scheme
PACS (Primary Agricultural Cooperative Societies) Computerisation
National Cooperative Exports Limited (NCEL) Scheme
Multi State Cooperative Societies Development Fund
GAIL Pankh Startup Initiative
Indian Oil Startup Scheme
HAL Innovation & Startup Centre
SAIL Startup & Innovation Policy
BEL Innovation & Startup Support
IRCTC Startup Innovation Fund
RailTel Innovation Challenge
NHPC Start-Up Initiative
Power Grid Innovation Challenge
CSIR Technologies for MSMEs
ICMR Research Grants for Health Startups
ICAR – Agri Startup Grants
NABARD RIDF (Rural Infrastructure Development Fund)
GIZ – DEG India Startup Finance
Mudra Shishu Loans for Women (Under PMMY)
WEP – Women Entrepreneurship Platform (NITI Aayog)
She Means Business – Digital Skills for Women
Dena Shakti Scheme for Women (Bank of Baroda)
Synd Mahila Shakti Scheme (Syndicate Bank)
TIDCO – Tamil Nadu Industrial Dev. Corp Schemes
TANSIDCO MSME Support Scheme
Startup Karnataka Policy 2022-27
Elevate 100 Programme
AP Startup Policy & Innovation
Vizag Fintech Valley
T-Works Prototype Manufacturing Hub
Hyderabad Pharma City Startup Scheme
MahaDBT – Direct Benefit Transfer for Entrepreneurs
Maharashtra Industrial Development Corporation (MIDC) Schemes
iHub Gujarat – Technology Innovation Fund
GVFL – Gujarat Venture Finance Ltd Fund
Nivesh Mitra – UP Single Window Portal
UP Textile Park Scheme
iStart Rajasthan
RIPS (Rajasthan Investment Promotion Scheme)
Mukhya Mantri Udyam Kranti Yojana
KSUM Special Grants for Deep Tech
Kerala Technology Startup Policy
Sagarmala Port Modernisation Programme
Sagarmala Coastal Community Development
Ship Building Financial Assistance Policy
National Waterway Development – IWAI Schemes
Coastal Shipping Incentive Scheme
Maritime India Vision 2030 – Startup Grants
Green Ship Building Incentive Scheme
NHAI InvIT – Infrastructure Investment Trust for Highways
PM Gram Sadak Yojana (PMGSY) Phase III
National Highway Logistics Facilities – NHLF
Hybrid Annuity Model (HAM) for Highway Projects
BOT Toll Highway Startup Opportunities
Indian Railways Station Redevelopment Programme
Rail Logistics Policy – Private Freight Terminal
One Station One Product (OSOP) Scheme
Indian Railways Startup Policy (IRSDC)
Private Train Operators Policy
Kisan Rail for Agri Produce Transport
Steel Scrap Recycling Policy
National Steel Policy 2017 – MSME Cluster Support
R&D for Steel (R&D Fund)
Domestic Steel Procurement Preference Policy
Petroleum, Chemicals and Petrochemicals Investment Region (PCPIR)
PLI Scheme for White Goods (AC & LED)
New Chemical Policy for MSMEs
Paints & Coatings Industry Development Scheme
Plastic Parks Scheme
Critical Minerals Mission – Startup Support
Exploration Licence for Private Players
Khanij Bidesh India Ltd (KABIL) Overseas Mineral Support
Mine Developer and Operator (MDO) Policy
Pradhan Mantri MUDRA Yojana Urban Special Window
National Urban Innovation Stack (NUIS)
PM SVANidhi Plus (Micro Credit for Street Vendors)
Metro Rail Policy – Private Participation
Transit Oriented Development (TOD) Policy
Smart Cities Innovation Challenge Fund
National Common Mobility Card (NCMC)
Revamped Distribution Sector Scheme (RDSS)
KUSUM-A Solar Power for Farmers
PLI for Solar PV Modules
PM Surya Ghar Subsidy – Rooftop Solar
Electricity Amendment Act – Open Access for MSMEs
National Electricity Fund (NEF)
Smart Metering Implementation (AMISP)
Meity's Data Centre Policy
India Enterprise Architecture (InEA)
Government e-Marketplace (GeM) Seller Onboarding
Open Government Data Platform (OGD)
MyScheme – Centralized Government Scheme Portal
e-Sanjeevani Telemedicine Platform for Health Startups
Aadhaar-Based Startup Authentication Services
DigiYatra – Aviation Digital Identity Platform
Tax Collected at Source (TCS) Exemption for Startups
Startup GST Exemption & Composition Scheme
ESOP Tax Deferment for Startup Employees
Self-Certification for Labour Laws (Startups)
Three-Year Tax Holiday for DPIIT Startups (80IAC)
Presumptive Taxation Scheme (Section 44AD) for MSMEs
GST QRMP Scheme for MSMEs
National Mission on Edible Oils – Oil Palm (NMEO-OP)
PM Kisan Maan Dhan Yojana (PM-KMY) Pension for Farmers
Soil Health Card Scheme
National Mission on Oilseeds and Oil Palm (NMOOP)
Integrated Scheme for Agricultural Marketing (ISAM)
Agristack – Federated Farmers Database
IFFCO Nano Urea Initiative for Agri Startups
NABARD Watershed Development Fund
Farmer Producer Organisation (FPO) Equity Grant Fund
APEDA Agri Export Promotion Scheme
National Project on Organic Farming (NPOF)
Dairy Entrepreneurship Development Scheme (DEDS)
Poultry Venture Capital Fund
National Programme for Bovine Breeding & Dairy Dev (NPBBD)
Integrated Development of Small Ruminants & Rabbits
National Livestock Health & Disease Control Programme
Integrated Scheme for Development of Silk Industry (ISDSI)
Central Silk Board – Bivoltine Silk Development Programme
KVIC Prime Minister Employment Generation Programme (PMEGP)
Khadi Gramodyog Vikas Yojana (KGVY)
SFURTI – Silk Cluster Development
Gold Monetisation Scheme (GMS)
India International Jewellery Show (IIJS) Participation Support
Special Notified Zone (SNZ) for Diamond Trading
Gem & Jewellery Export Promotion Council (GJEPC) Schemes
Gems & Jewellery Sector PLI – Design Innovation Grant
PLI for Large Scale Electronics Manufacturing
PLI for Mobile Phones & Specified Electronic Components
Electronics Cluster Development Programme (ECDP)
National Centre for Flexible Electronics (NCFlexE)
Indian Semiconductor Research Centre (ISRC) Grants
IN-SPACe Authorization for Private Space Launch
NewSpace India Ltd (NSIL) Technology Transfer
Geospatial Data Liberalisation – NGIS Policy
Indian National Space Promotion & Authorization Centre (IN-SPACe) Seed Fund
ISRO Technology Transfer Programme
Space Situational Awareness (SSA) Startup Support
National Film Award Support for Startups
OTT Platform Development Incentive
Broadcast Audience Research Council (BARC) Data Access for Startups
India Game Developer Conference (IGDC) Support
National Mission on Strategic Knowledge for Climate Change (NMSKCC)
National Action Plan on Climate Change (NAPCC) Schemes
Startup India Climate Action Challenge
CERC Green Term Ahead Market (GTAM) for Startups
Sustainable Finance for Green MSMEs (SIDBI Green Finance)
National Mission for a Green India (GIM)
National Clean Air Programme (NCAP) Innovation Fund
EESL Energy Efficiency Innovation Support
Account Aggregator (AA) Framework for FinTech Startups
UPI Innovation Fund (NPCI)
RBI FinTech Repository
IFSCA FinTech Incentive Scheme (GIFT City)
SEBI FinTech Regulatory Framework for WealthTech
IRDAI Regulatory Sandbox for InsurTech
PFRDA Innovation for PensionTech Startups
GIFT City Financial Services Startup Support
Open Credit Enablement Network (OCEN) for Lenders
National Payments Corporation of India (NPCI) BharatPay
MedTech Startup Innovation Program (MSIP)
National Programme for Prevention & Control of Cancer (NPCC)
PM National Dialysis Programme
National Organ & Tissue Transplant Organisation (NOTTO)
Pradhan Mantri National AIDS Control Programme
National TB Elimination Programme – Digital Initiative
National Mental Health Programme (NMHP) Startup Support
India MedTech Expo & Investment Support
National Digital Library of India (NDLI)
Coding for Kids Initiative – CBSE & MeitY
Apprenticeship Embedded Degree Programme (AEDP)
Jan Shikshan Sansthan (JSS) Vocational Training
Pradhan Mantri Kaushal Kendras (PMKK)
Modular Employable Skills (MES) Scheme
Craftsmen Training Scheme (CTS) – ITI
Skill Vouchers for Private Training Providers
Recognition of Prior Learning (RPL) Scheme
National Apprenticeship Training Scheme (NATS)
Impact Investors Council (IIC) India Fund
Social Stock Exchange (SSE) – SEBI Framework
NGO Darpan – CSR Fund Access Portal
PM CARES Fund CSR Project Support
Corporate Social Responsibility (CSR) Innovation Fund
Atal Community Innovation Centre (ACIC)
Social Alpha Innovation Platform
National Water Awards (NWA) Innovation Support
PM Krishi Sinchayee Yojana (PMKSY) – Micro Irrigation
National Hydrology Project (NHP) Data Access for Startups
Namami Gange – Ganga Rejuvenation Innovation Fund
Aquifer Mapping & Management Programme
Pradhan Mantri Micro Food Processing Enterprises (PM-FME)
National Rural Economic Transformation Project (NRETP)
Pradhan Mantri Gram Sadak Yojana (PMGSY) – Connectivity for Agri
Shyama Prasad Mukherji Rurban Mission (SPMRM)
National Social Assistance Programme (NSAP)
Deen Dayal Upadhyay Grameen Kaushalya Yojana (DDU-GKY)
Mahatma Gandhi NREGA (MGNREGS) Convergence
Common Facility Centre (CFC) under MSE-CDP
Infrastructure Development Scheme for MSME Clusters
Technology Centre Systems Programme (TCSP)
National Manufacturing Competitiveness Programme (NMCP)
Procurement and Marketing Support Scheme (PMS) for MSMEs
Design Clinic Scheme for MSMEs
Bar Coding / Quality Certification Reimbursement Scheme
Sikkim State Startup Policy
Nagaland Startup Policy – StartupNaga
Manipur Startup Policy
Tripura Startup Policy
Meghalaya Startup Policy – MeghaStart
Arunachal Pradesh Industrial Investment Policy
Mizoram State Startup Policy
Mukhyamantri Swarozgar Yojana – Uttarakhand
HP Mukhya Mantri Swavalamban Yojana
Delhi Industrial Policy 2021
Haryana Udhyam Memorandum Digital Portal
Rajasthan MSME (Facilitation of Establishment and Operation) Act
MSME Assistance Programme Gujarat
Punjab Skill Development Mission
Karnataka Digital Economy Mission (KDEM)
TIDCO Venture Capital Fund
YSR Jagananna Chedodu Scheme for MSMEs
Telangana MSME Policy 2020
Kerala Financial Corporation (KFC) MSME Loans
MP Trade & Investment Facilitation Corporation (TRIFAC)
MSME Technology Upgradation Subsidy – Odisha
WBIDC Industrial Park Scheme
Bihar Industrial Investment Promotion Policy
Jharkhand MSME Policy 2015 (Revised)
Assam Industrial & Investment Policy
CG Industrial Policy 2019-24
National Initiative for Developing and Harnessing Innovations (NIDHI)
BIRAC PACE Programme for Biotech Incubation
Centre of Excellence for IoT (IoT CoE) MeitY
National Robotics Mission (DST)
Centre of Excellence for Drones & Counter Drone Systems
National Centre of Excellence for Green Port & Shipping (NCoEGPS)
IIT Hyderabad Deep Tech Startup Incubator
IISc Start-up Connect & DESE Incubation
CCAMP (Centre for Cellular and Molecular Platforms)
Venture Center Pune – NCL Innovation Park
Coal India Ltd (CIL) Innovation & Startup Fund
ONGC Energy Centre (OEC) for Clean Energy Startups
BSNL Startup & Innovation Challenge
MTNL Innovation Programme
Airport Authority of India (AAI) Startup Support
CONCOR (Container Corporation) Logistics Startup Challenge
Hindustan Copper Ltd (HCL) Innovation Support
National Aluminium Company (NALCO) Startup Fund
TCIL Technology Startup Programme
PM Micro Food Processing Enterprises Scheme (PM-FME)
Food Testing Infrastructure – NABL Accreditation Support
Cold Storage Infrastructure Subsidy (NHB)
APEDA Export Facilitation for Organic Products
Indian Institute of Food Processing Technology (IIFPT) Incubation
National Institute of Food Technology Entrepreneurship & Management (NIFTEM)
PM Krishi Sinchayee Yojana – Har Khet Ko Pani
National Water Resource Development Programme
Pradhan Mantri Krishi Sinchayee Yojana – Watershed Development
Per Drop More Crop – Micro Irrigation
Repair Renovation Restoration (RRR) of Water Bodies
National Aquifer Mapping Programme (NAQUIM)
PLI Scheme for Drones & Drone Components
Drone Shakti Initiative (MoCA)
National Drone Policy 2021
Kisan Drone Scheme – Agriculture UAV Subsidy
DRDO – Drone Technology Development Fund
Drone Didi Scheme for Women SHGs
UTM (Unmanned Traffic Management) Framework for Startups
FAME India Phase II – EV Purchase Subsidy
PM E-Bus Sewa – Electric Bus Deployment
EMPS 2024 – Electric Mobility Promotion Scheme
EV Charging Infrastructure Development Scheme
National Electric Mobility Mission Plan (NEMMP)
EESL EV Aggregation Scheme for Bulk Procurement
EV Battery Swapping Policy (NITI Aayog)
Alternate Fuels for Transportation (Hydrogen Mobility)
National Policy on Biofuels 2018 (Revised 2022)
Pradhan Mantri JI-VAN Yojana (Biofuel)
SATAT Scheme – Compressed Biogas (CBG)
Ethanol Blending Programme (EBP)
National Bamboo Mission
BIRAC Industrial Biofoundry Support
PLI for Semiconductors & Display Fab
Design Linked Incentive (DLI) for Chip Design
India Semiconductor Mission (ISM) Startup Support
Compound Semiconductors & Other Electronics Scheme
Advanced Chemistry Cell (ACC) Battery PLI
National Robotics Programme – DST
ATAL Innovation Mission – Robotics Challenge
Centre of Excellence for Robotics (CoER)
Industrial Automation & Industry 4.0 Scheme – MeitY
MSME Industry 4.0 Adoption Scheme
National Cyber Security Policy Implementation Fund
CERT-In Startup Empanelment Scheme
DSCI Cybersecurity Startup Programme
Cyber Surakshit Bharat Initiative
Information Security Education & Awareness (ISEA) Grants
National Cyber Coordination Centre (NCCC) Partner Programme
NASSCOM AI Gamechangers Programme
MeitY AI CoE – Farming, Healthcare & Smart Cities
National Data & Analytics Platform (NDAP)
AI for Agriculture – ICAR-ICRISAT Partnership Grant
India AI Startup Fellowship Programme
ResponsibleAI Startup Grants (NASSCOM & MeitY)
AI & ML Research Grant – DST SERB
Green Climate Fund – India Projects
LIFE Programme (Lifestyle for Environment)
National Mission for Himalayan Studies (NMHS)
National Mission for Sustaining the Himalayan Ecosystem
National Adaptation Fund for Climate Change (NAFCC)
National Wetlands Conservation Programme (NWCP)
Compensatory Afforestation Fund (CAMPA) Grants
PM Van Mitra Scheme – Urban Forestry
North East Special Infrastructure Development Scheme (NESIDS)
Schemes under Ministry of DoNER (North East)
Special Accelerated Road Development Programme for NE (SARDP-NE)
Bamboo Mission for North East
North East Rural Livelihood Project (NERLP)
PM DevINE – PM Development Initiative for NE Region
Integrated Basin Development & Livelihoods Programme (IBDLP) – Meghalaya
Holistic Development of Islands (Andaman & Lakshadweep)
NITI Aayog Island Development Agency Scheme
Lakshadweep Development Corporation Schemes
PM Jan Vikas Karyakram (PMJVK)
Seekho aur Kamao (Learn & Earn) for Minorities
Usttad Scheme (Minorities Artisan Development)
Nai Manzil – Education & Skill Development for Minorities
NMDFC Concessional Loan Schemes
Garib Nawaz Employment Scheme
Hamari Dharohar – Cultural Heritage Preservation
Jiyo Parsi Scheme
National Backward Classes Finance & Dev Corp (NBCFDC) Loans
OBC Pre-Matric & Post-Matric Scholarship Scheme
Dr. Ambedkar Post-Matric Scholarship for EBC
Central Sector Scheme for Top Class Education for SC Students
Venture Capital Fund for SCs (VCFSC) – IFCI
Assistance to Disabled Persons (ADIP Scheme)
Scheme for Implementation of Persons with Disabilities Act (SIPDA)
National Fellowship for Students with Disabilities
PM Accessible India Campaign (Sugamya Bharat)
National Trust Scheme for Persons with Autism etc.
Senior Care Ageing Growth Engine (SAGE) – Startup Support
Ex-Servicemen Contributory Health Scheme (ECHS)
PM Rozgar Yojana for Ex-Servicemen
Kendriya Sainik Board Startup & Entrepreneurship Fund
Canteen Stores Department MSME Procurement Scheme
Bureau of Indian Standards (BIS) Hallmarking Scheme
National Accreditation Board for Testing & Calibration Labs (NABL)
Quality Council of India (QCI) Certification Support for MSMEs
Agmark Certification for Agricultural Products
APEDA HACCP & Organic Certification Support
National Organic Farming Research Institute (NOFRI) Certification
India Post Payments Bank (IPPB) – MSME Banking
India Post Logistics – e-Commerce Integration Scheme
Postal Life Insurance (PLI) for MSMEs
DigiGaon – Rural Digital Hub via Post Offices
Credit Risk Guarantee Fund Trust for Low Income Housing
Interest Subsidy Scheme for Housing (CLSS under PMAY)
HUDCO Loan Scheme for Affordable Housing Projects
NHB Refinance Schemes for Housing Finance Companies
Pradhan Mantri Awas Yojana Credit Linked Subsidy Scheme (CLSS-MIG)
National Intellectual Property Awareness Mission (NIPAM)
IP India – Patent Filing Fee Reduction for Startups
Startup Legal Facilitation – Virtual Courts for IP Disputes
Arbitration & Conciliation Centre for MSMEs (SAMADHAAN)
Fast-Track Trademark Registration for Startups
Copyright Societies Support Scheme
Pradhan Mantri Rojgar Protsahan Yojana (PMRPY) 2.0
Employee Provident Fund (EPF) Subsidy for New Establishments
ESIC Health Insurance Scheme for MSME Workers
Atal Bimit Vyakti Kalyan Yojana (ABVKY)
Labour Welfare Fund Scheme
Fixed Term Employment (FTE) Scheme for MSMEs
Pradhan Mantri Shram Yogi Maandhan (PM-SYM)
National Career Service (NCS) Portal – MSME Hiring
GST Composition Scheme for Small Businesses
Input Tax Credit (ITC) Automation for MSMEs
GST Sahay – Working Capital Loans via GST Data
Vivad Se Vishwas Scheme (Tax Dispute Resolution)
TReDS – Trade Receivables Discounting System
Faceless Assessment & Appeal Scheme for MSMEs
National Steel Policy Raw Material Security for MSMEs
MSME Steel Processing Cluster Scheme
Jawaharlal Nehru Aluminium Research & Design Centre (JNARDDC)
Copper Development Centre Scheme
Zinc & Lead Processing MSME Support
OIDB – Oil Industry Development Board Grants
NELP/OALP – Hydrocarbon Exploration for Private Players
City Gas Distribution (CGD) Network Startup Opportunities
Gas Pooling Scheme for Fertiliser Plants
LNG Terminal Development Incentive Scheme
Civil Aviation Research Organisation (CARO) Grants
MRO (Maintenance, Repair & Overhaul) Policy 2021
National Aviation Security Fund
DGCA Regulatory Sandbox for eVTOL & AAM
India-Israel R&D Fund for Aerospace Innovation
CSIR-NAL Technology Transfer for Aerospace MSMEs
Common Facility Centre for Gems & Jewellery Clusters
India International Jewellery Week (IIJW) Support
Indian Footwear, Leather & Accessories Development Programme (IFLADP)
Mega Leather, Footwear & Accessories Cluster (MLFAC)
PLI Scheme for Leather & Footwear Products
National Leather Development Programme (NLDP)
CLFA (Council for Leather Exports) Marketing Support
Technology Upgradation of Leather Sector (TULS)
PLI Scheme for White Goods Including Furniture Components
National Action Plan for Forest Products (NAPFP)
Furniture & Fittings Skill Council Certification
Wood Based Industry Development Scheme
National Forest Policy for Paper Industry
Pulp & Paper Technology Mission
DPIIT Chemicals Investment Promotion Scheme
National Chemical Policy for Green Chemistry
Pesticide Management Bill Framework for Agri-Chem Startups
Explosives and Petroleum Safety Organisation (PESO) Startup Scheme
National Rubber Policy for MSME Manufacturers
Rubber Plantation Development Scheme
Coir Industry Development Scheme
Indian Ceramic Technology Cluster Scheme
Central Glass & Ceramic Research Institute (CGCRI) Incubation
PM Awas Yojana – Beneficiary-Led Construction (BLC)
RERA Startup Technology Solution Empanelment
National Buildings Construction Corporation (NBCC) Startup Tie-up
Green Building Rating System (GRIHA) Certification Support
Pradhan Mantri Sahaj Bijli Har Ghar Yojana (SAUBHAGYA)
CSIR Jigyasa – School-Lab Innovation Programme
IIT Bombay SINE Incubation Programme
IIT Delhi Foundation for Innovation & Technology Transfer (FITT)
IIT Madras Research Park Incubation
IISc Entrepreneurship Cell & Startup Hub
NIT Trichy Technology Incubation Centre
IIST – Indian Institute of Space Science & Technology Startups
C-DAC AI Incubation Programme
NCBS – National Centre for Biological Sciences Biotech Incubation
IIM Bangalore NSRCEL Startup Programme
IIM Calcutta Innovation Park (IIMCIP)
XLRI – Xavier School of Management Startup Support
ISB Hyderabad – DLabs Incubation
IARI – Indian Agricultural Research Institute Startup Grants
India-US Strategic Clean Energy Partnership (SCEP)
USAID PACE India Programme for Startups
EU-India Innovation Cooperation
India-Israel Industrial R&D Fund (ISERD)
India-UK PRISM (Prosperity & Resilience through Innovation)
Indo-German Science & Technology Centre (IGSTC)
India-Japan Startup Hub Initiative
ASEAN-India Innovation Platform
India-Canada Industrial R&D Programme (IC-IMPACTS)
Bilateral Trade Promotion Agreement (BTPA) Export Grants
PMFBY – Crop Insurance for Agri Startups
National Crop Insurance Programme (NCIP)
Weather Based Crop Insurance Scheme (WBCIS)
IRDAI Motor Third Party Pooling for EV Startups
Micro Insurance Scheme for Low Income Entrepreneurs
Export Credit Guarantee Corporation (ECGC) Trade Credit Insurance
PLI Scheme for Printing Ink & Packaging Materials
Flexible Packaging Innovation Cluster Scheme
Indian Institute of Packaging (IIP) Technology Transfer
FLEXPACK India Innovation Grant
National Legal Services Authority (NALSA) Tech Startup Programme
Tele-Law Scheme – Legal Services Startup Integration
Ministry of Law – Digital Courts Innovation Challenge
Nyaya Bandhu – Pro Bono Tech Startup Integration
NABI – National Agri-Food Biotechnology Institute Incubation
ICRISAT Innovation Lab for Dryland Crops
ATMA (Agricultural Technology Management Agency) Support
MANAGE – National Institute of Agricultural Extension Grants
ICAR – National Fund for Basic, Strategic and Frontier Application Research
Central Drug Research Institute (CDRI) Incubation Scheme
ICMR Extramural Research Grants for MedTech
DBT–BIRAC BIONEST for Healthcare Startups
DBT Wellcome India Alliance Research Grants
NHSRC – National Health Systems Resource Centre Tech Grants
National e-Governance Division (NeGD) EdTech Innovation
DIKSHA Platform for EdTech Startup Integration
CBSE Skill Education Lab Setup Scheme
NIT Startup – National Institute of Technology Incubation Seed Fund
AICTE Idea Lab – Innovation & Design Excellence for Students
Logistics Data Bank (LDB) Service Provider Scheme
Freight Operations Information System (FOIS) Startup Integration
Port Community System (PCS1x) Startup Partner Programme
National Logistics Policy – Ease of Logistics (ELOG)
NICDC Logistics Data Services for Startups
Gujarat IT/ITeS Policy 2022-27 for Startups
Vibrant Gujarat Startup Summit Grant
Maharashtra Startup Week Grants
MSRDC Infrastructure Startup Support
One Crore Internship Programme Karnataka
Karnataka Biotechnology Policy
TANSIM – Tamil Nadu Startup & Innovation Mission
TIDEL Park Incubation Scheme
AP Innovation Society (APIS) Deep Tech Fund
Sunrise AP Startup Support Fund
Hyderabad FinTech Valley Initiative
Telangana Emerging Technology Wing (ETW) Grants
KSUM IEDC (Innovation and Entrepreneurship Development Centre)
Kerala Startup Mission Angel Network
WEBEL IT Startup Incubation Scheme
Biswa Bangla Marketing Scheme for Handicrafts
OCAC IT Startup Incubation Scheme
Odisha Livelihood Mission Startup Support
MPIDC Industrial Plot for Startups
MP Laghu Udyog Nigam MSME Support
Punjab Rural Development & Panchayat Innovation Fund
Haryana Textile Policy 2019
Rajasthan Agro Processing Startup Scheme
Bihar Industrial Area Development Authority (BIADA) Scheme
JIDCO – Jharkhand Industrial Dev Corp Scheme
Assam Electronic Development Corporation (AMTRON) Incubation
CIPET – Central Institute of Petrochemicals Engineering CG Scheme
HIMUDA Industrial Area Startup Plot Scheme
UPCL Green Energy Startup Incentive
Goa Investment Promotion Board MSME Scheme
J&K Handicrafts Development Corporation Scheme
Ladakh Autonomous Hill Development Council – Startup Fund
Mission IOCL for Hydrogen Technology Startups
POWER-Tech India – Power Sector Innovation Grants
Centre of Excellence for Climate & Sustainability (CoECS)
National Mission on Power Electronics Technology (NaMPET)
India Electronics Week Innovation Challenge
Quantum Computing Applications Lab (QCAL)
National Centre for Photonics Technology (NCPG)
CERN – India Innovate Collaboration Grants
INSPIRe – Innovation in Science Pursuit for Inspired Research
NIDHI-Accelerator (DST) – Deep Tech Startup Acceleration
Open Network for Digital Commerce (ONDC) Seller Onboarding
National Retail Policy 2021 – MSME Retail Support
PM Retail Credit Guarantee Scheme
DPIIT Retail Innovation Sandbox
National Resource Efficiency Policy (NREP)
Extended Producer Responsibility (EPR) for Plastics
Battery Waste Management Rules – Startup Opportunity
E-Waste Recycling Authorisation Scheme
Swachh Bharat Mission Urban – SWM Startup Support
Construction & Demolition Waste Processing Scheme
Municipal Solid Waste (MSW) Concession for Startups
CPCB Green Credit Programme for Startups
Deep Ocean Mission – Mineral Extraction Startup
National Marine Fisheries Data Centre (NMFDC)
Coastal Aquaculture Authority (CAA) Licensing for Startups
National Fisheries Development Board (NFDB) Schemes
Seaweed Mission – National Mission for Seaweed Cultivation
Desalination Technology for Coastal MSMEs (CSIR-CSMCRI)
National Smart Grid Mission (NSGM)
Smart Metering National Programme Startup Empanelment
Smart Cities Labs – Urban Innovation Challenge
Housing & Urban Development Corporation (HUDCO) Tech Scheme
Urban Innovation Challenge (UIC) – MoHUA
DST Inspire Faculty Award & Research Grant
Biotechnology Ignition Grant (BIG) Expansion Round
Science & Engineering Research Board (SERB) CRG Grant
CSIR Research Associateship for Industry Projects
IISc MRDG Research Seed Grant for Startups
Pradhan Mantri Kisan Drones for Pesticide Spraying
National Mission for Protein Supplements (NMPS)
Horticulture Development Programme for NE and Himalayan States
Oil Palm Area Expansion (OPAE) Scheme
MSME Performance and Credit Rating Scheme
Quality Management Standards & Quality Tech Tools (QMS/QTT)
Grievance Against Payment Delay (MSME SAMADHAAN Plus)
PM Garib Kalyan Rozgar Abhiyan
NARI Shakti Vandan Adhiniyam – Women Reservation Support Fund
Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)
PM POSHAN – National Programme for Mid Day Meals Vendor Scheme
National Livelihood Mission – Digital Financial Inclusion
Rural Self Employment Training Institutes (RSETI)
Open Finance Framework for Embedded Lending Startups
India Stack Developer Access Programme
DigiLocker API Integration for Fintech KYC
Zero Defect Zero Effect (ZED) Green Certification
National Mission for Sustainable Agriculture – Climate Change Adaptation
National Action Plan on Marine Litter (NAPML) Innovation Grant
National Urban Sanitation Policy Innovation Challenge
National Language Translation Mission (NLTM) – Bhashini Startup Integration
AI Pravega – AI Research Grants via IIT Consortium
Chip-to-Startup (C2S) Programme – VLSI Design Education
Digital Sky Platform – NPNT Drone Certification
CESL Convergence EV Charging Startup Programme
IITM Pravartak Technologies Foundation Incubation
BITS Pilani Technology Innovation Centre
Amrita University – Ammachi Labs Social Innovation Fund
Manipal Academy MAHE Innovation Grants
World Bank MSME Development Programme India
`;

const lines = rawSchemesList
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0);

const schemes = lines.map((name) => {
  // Clean name
  const cleanName = name.replace(/\r/g, "").trim();
  
  // Lowercase for keyword checking
  const lowerName = cleanName.toLowerCase();
  
  // Categorize type: "Scheme" | "Grant" | "Loan"
  let type: "Scheme" | "Grant" | "Loan" = "Scheme";
  if (lowerName.includes("grant") || lowerName.includes("fellowship") || lowerName.includes("scholarship")) {
    type = "Grant";
  } else if (lowerName.includes("loan") || lowerName.includes("credit") || lowerName.includes("guarantee") || lowerName.includes("finance") || lowerName.includes("subsidy") || lowerName.includes("refinance")) {
    type = "Loan";
  }

  // Assign Lucide icon
  let icon = "Award"; // Default
  let description = "Government funding scheme to support corporate development and industrial growth.";

  if (lowerName.includes("seed") || lowerName.includes("sprout") || lowerName.includes("start-up") || lowerName.includes("startup")) {
    icon = "Sprout";
    description = "Provides early-stage seed funding and capital support for startups to build prototypes and scale operations.";
  } else if (lowerName.includes("loan") || lowerName.includes("credit") || lowerName.includes("guarantee") || lowerName.includes("nbfc") || lowerName.includes("finance") || lowerName.includes("interest") || lowerName.includes("subvention") || lowerName.includes("bills") || lowerName.includes("invoice") || lowerName.includes("borrowing")) {
    icon = "Landmark";
    description = "Offers concessional debt financing, credit guarantees, and working capital loans for business development.";
  } else if (lowerName.includes("digital") || lowerName.includes("ai") || lowerName.includes("software") || lowerName.includes("tech") || lowerName.includes("chip") || lowerName.includes("computing") || lowerName.includes("quantum") || lowerName.includes("semiconductor") || lowerName.includes("electronics") || lowerName.includes("cyber") || lowerName.includes("it")) {
    icon = "Cpu";
    description = "Supports research, development, and incubation in advanced deep tech, electronics, and digital systems.";
  } else if (lowerName.includes("bio") || lowerName.includes("pharma") || lowerName.includes("medical") || lowerName.includes("health") || lowerName.includes("ayushman") || lowerName.includes("drug") || lowerName.includes("vaccine") || lowerName.includes("clinical")) {
    icon = "HeartPulse";
    description = "Funding and incubation support for healthcare, pharmaceuticals, biotechnology, and medical device innovations.";
  } else if (lowerName.includes("agriculture") || lowerName.includes("agri") || lowerName.includes("kisan") || lowerName.includes("fpo") || lowerName.includes("organic") || lowerName.includes("horticulture") || lowerName.includes("fisheries") || lowerName.includes("dairy") || lowerName.includes("livestock") || lowerName.includes("farming") || lowerName.includes("crop") || lowerName.includes("bima")) {
    icon = "Wheat";
    description = "Promotes modern farming methods, cold chain logistics, and technology integration in agriculture.";
  } else if (lowerName.includes("solar") || lowerName.includes("energy") || lowerName.includes("surya") || lowerName.includes("hydrogen") || lowerName.includes("green") || lowerName.includes("climate") || lowerName.includes("clean") || lowerName.includes("bioenergy") || lowerName.includes("biogas") || lowerName.includes("biomass") || lowerName.includes("carbon")) {
    icon = "Sun";
    description = "Encourages adoption of clean energy, rooftop solar installations, and sustainable green technology solutions.";
  } else if (lowerName.includes("women") || lowerName.includes("mahila") || lowerName.includes("stree") || lowerName.includes("girl") || lowerName.includes("ladli") || lowerName.includes("beti")) {
    icon = "UserCheck";
    description = "Empowers women entrepreneurs with financial assistance, training, and marketing opportunities.";
  } else if (lowerName.includes("export") || lowerName.includes("trade") || lowerName.includes("merchandise") || lowerName.includes("foreign") || lowerName.includes("seis") || lowerName.includes("meis") || lowerName.includes("international")) {
    icon = "Globe";
    description = "Provides incentives, duty exemptions, and infrastructure support to boost international trade and exports.";
  } else if (lowerName.includes("defence") || lowerName.includes("idex") || lowerName.includes("drdo") || lowerName.includes("military") || lowerName.includes("security")) {
    icon = "Shield";
    description = "Promotes innovation, research, and development in national defense, aerospace, and security technologies.";
  } else if (lowerName.includes("skill") || lowerName.includes("kaushal") || lowerName.includes("apprenticeship") || lowerName.includes("education") || lowerName.includes("prime") || lowerName.includes("scholarship") || lowerName.includes("fellowship") || lowerName.includes("training") || lowerName.includes("school") || lowerName.includes("institutes") || lowerName.includes("internship")) {
    icon = "GraduationCap";
    description = "Provides vocational training, skill development programs, and educational scholarships for youth.";
  } else if (lowerName.includes("msme") || lowerName.includes("industrial") || lowerName.includes("cluster") || lowerName.includes("champs") || lowerName.includes("factory") || lowerName.includes("manufacturing") || lowerName.includes("textile") || lowerName.includes("steel") || lowerName.includes("pli") || lowerName.includes("weavers") || lowerName.includes("leather") || lowerName.includes("wood")) {
    icon = "Factory";
    description = "Boosts domestic manufacturing capabilities, cluster development, and quality certifications for MSMEs.";
  } else if (lowerName.includes("tax") || lowerName.includes("exemption") || lowerName.includes("gst") || lowerName.includes("duty") || lowerName.includes("reimbursement") || lowerName.includes("remission")) {
    icon = "Receipt";
    description = "Offers tax holidays, GST concessions, and direct tax exemptions to foster ease of doing business.";
  } else if (lowerName.includes("smart") || lowerName.includes("cities") || lowerName.includes("awaas") || lowerName.includes("urban") || lowerName.includes("infrastructure") || lowerName.includes("housing") || lowerName.includes("rurban") || lowerName.includes("amrut")) {
    icon = "Building";
    description = "Supports urban renewal, affordable housing development, and smart city infrastructure modernization.";
  } else if (lowerName.includes("logistics") || lowerName.includes("gatishakti") || lowerName.includes("bharatmala") || lowerName.includes("sagarmala") || lowerName.includes("port") || lowerName.includes("freight") || lowerName.includes("transport") || lowerName.includes("corridor") || lowerName.includes("road") || lowerName.includes("railway") || lowerName.includes("aviation") || lowerName.includes("highway") || lowerName.includes("cargo") || lowerName.includes("postal") || lowerName.includes("post")) {
    icon = "Truck";
    description = "Enhances multimodal transport logistics, port connectivity, and corridor infrastructure efficiency.";
  }

  // Create unique id slug
  const id = cleanName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id,
    name: cleanName,
    type,
    icon,
    description
  };
});

const outputFilePath = join(__dirname, "../src/data/schemes.json");
writeFileSync(outputFilePath, JSON.stringify(schemes, null, 2), "utf8");
console.log(`Successfully generated ${schemes.length} schemes to ${outputFilePath}`);
