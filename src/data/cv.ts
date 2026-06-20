export type CvAction = {
	label: string;
	href: string;
	primary?: boolean;
	external?: boolean;
	download?: boolean;
	analytics: string;
};

export type SectionNavItem = {
	label: string;
	href: string;
};

export type ProofTile = {
        value: string;
        label: string;
};

export type ImpactHighlight = {
        category: string;
        title: string;
        body: string;
};

export type ExpertiseGroup = {
        eyebrow?: string;
        title: string;
	summary?: string;
	compactSummary?: string;
	detailSummary?: string;
	items: string[];
	chips?: string[];
	evidence?: string[];
	representativeWork?: string[];
	methods?: string[];
};

export type ExperienceItem = {
	title: string;
	organization?: string;
	location?: string;
	dates: string;
	summary: string;
	highlights: string[];
	details?: string[];
	detailGroups?: {
		title: 'Technical details' | 'Validation scope' | 'Additional responsibilities';
		items: string[];
	}[];
	tags: string[];
};

export type CompactExperienceItem = {
	title: string;
	organization: string;
	dates: string;
	summary: string;
	bullets: string[];
};

export type CaseStudy = {
	eyebrow: string;
	title: string;
	statement: string;
	role: string;
	focus: string;
	proof: string;
	href: string;
};

export type ResearchMetric = {
	value: string;
	label: string;
	description?: string;
};

export type ResearchOutcome = {
	value: string;
	label: string;
};

export type EducationItem = {
	degree: string;
	year: string;
	institution?: string;
	focus?: string;
	dissertation?: string;
	description: string;
	links?: { label: string; href: string }[];
};

export type ToolGroup = {
        title: string;
        primaryTools?: string;
        methods?: string;
        languages?: { language: string; level: string }[];
};

export type LearningRecognition = {
        recognition: string[];
        recentLearning: string[];
};

export const cvProfile = {
	links: {
		pdf: '/cv/Carlos_Jorques_CV.pdf',
		contact: '/contact',
		work: '/work',
		linkedin: 'https://www.linkedin.com/in/carlosjorques/',
	},
	hero: {
		eyebrow: 'Online CV',
		title: 'Carlos Jorques',
		subtitle: 'Senior Software Developer | Embedded Controls Architect | Electric & Autonomous Vehicle Systems',
		summary:
			'I am a senior embedded controls engineer with 10+ years of experience developing real-time control software for automotive and heavy-duty vehicle systems. I focus on EV thermal management, battery systems, autonomous propulsion control, diagnostics, functional safety, validation, and production embedded software.',
		secondarySummary:
			'I translate automatic control concepts into robust, testable, safety-aware embedded software for complex physical systems where reliability, timing, diagnostics, and system integration matter. My work spans requirements, control architecture, model-based implementation, generated C/C++ code, vertical system integration, calibration, MIL/SIL/HIL validation, and production-oriented delivery across OEM and Tier 1 environments, including technical leadership and mentoring across cross-functional automotive teams.',
		tertiarySummary:
			'Recent work includes electric truck thermal management, battery and charger coordination, autonomous electric hauler propulsion control, e-bike motor control, wireless charging, DC/DC converter interfaces, and heavy-duty engine diagnostics. I also lead and mentor embedded software engineers across cross-functional automotive development environments.',
	},
	actions: [
		{ label: 'Download PDF CV', href: '/cv/Carlos_Jorques_CV.pdf', primary: true, download: true, analytics: 'cv_pdf_download' },
		{ label: 'Contact Carlos', href: '/contact', analytics: 'cv_contact_click' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/carlosjorques/', external: true, analytics: 'cv_linkedin_click' },
		{ label: 'Selected Work', href: '/work', analytics: 'cv_selected_work_click' },
	] satisfies CvAction[],
	sectionNav: [
		{ label: 'Expertise', href: '#expertise' },
		{ label: 'Impact', href: '#impact' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Systems', href: '#representative-systems' },
		{ label: 'Research', href: '#research' },
		{ label: 'Education', href: '#education' },
		{ label: 'Tools', href: '#tools' },
		{ label: 'Contact', href: '#contact' },
	] satisfies SectionNavItem[],
	proofTiles: [
		{ value: '10+ years', label: 'Automotive embedded controls' },
		{ value: 'Current focus', label: 'EV thermal management, BMS, diagnostics' },
		{ value: 'Leadership', label: 'Technical lead for embedded software engineers' },
		{ value: 'Systems', label: 'Electric trucks, autonomous haulers, powertrain controls' },
		{ value: 'Evidence', label: 'PhD, 5 patents, 15+ publications' },
		{ value: 'Location', label: 'Valencia, Spain / open to selected opportunities' },
	] satisfies ProofTile[],
	relevantFor: [
		'Senior Electronics Engineer',
		'Embedded Controls Architect',
		'Technical Lead',
		'Control Systems Engineer',
		'BMS / Thermal Management Engineer',
		'Functional Safety Engineer',
		'Autonomous Machine Controls',
		'Powertrain Software Engineer',
		'Model-Based Development Lead',
	],
	executiveSummary: [
		'I specialize in developing embedded control software for complex physical systems where reliability, timing, diagnostics, and system integration matter. My experience covers the full engineering lifecycle: requirements, concept design, control architecture, model-based implementation, generated C/C++ code, integration, calibration, validation, and production-oriented delivery.',
		'In recent roles, I have worked on electric truck thermal management, battery and charger coordination, autonomous electric hauler propulsion control, e-bike motor control, wireless charging, DC/DC converter interfaces, and heavy-duty engine diagnostics. I have also led small engineering teams, coordinated technical delivery, mentored junior developers, and worked across cross-functional automotive organizations.',
		'My strongest technical identity is automatic control applied to embedded systems: designing estimators, regulators, diagnostic logic, safety-aware fallback behavior, and validation strategies for real-world systems with physical constraints.',
	],
	expertise: [
		{
			title: 'Embedded Controls Architecture',
			items: [
				'Real-time control architecture for vehicle and powertrain systems',
				'Estimators, regulators, diagnostic logic, and validation strategies for real-world systems with physical constraints',
				'Model-based control design and vertical system integration across software, controls, diagnostics, sensors, actuators, and physical hardware',
				'Control logic for thermal management, propulsion, torque allocation, battery systems, and diagnostics',
				'System requirements, functional design, software architecture, and implementation strategy',
				'Model-based development with MATLAB/Simulink and production-oriented generated code',
			],
			chips: ['Control architecture', 'MBD', 'Generated code'],
			evidence: [
				'Electric truck thermal management and BMS controller architecture',
				'Autonomous hauler propulsion control and torque allocation',
				'Heavy-duty engine diagnostics and closed-loop combustion control',
				'Production-oriented generated C/C++ code boundaries',
			],
		},
		{
			title: 'Electric and Autonomous Vehicle Systems',
			items: [
				'Electric truck thermal management for batteries, auxiliaries, power electronics, and charging systems',
				'Battery thermal management and predictive thermal control concepts',
				'Autonomous electric hauler traction and speed control',
				'Torque allocation across dual electric motors and redundant actuator concepts',
				'System-level validation in SIL, HIL, test bench, test track, and vehicle environments',
			],
			chips: ['EV systems', 'BMS', 'Autonomous machines'],
		},
		{
			title: 'Embedded Software and Validation',
			items: [
				'Embedded C/C++ and model-based software implementation',
				'Translation of complex control algorithms into clean, maintainable real-time software',
				'ECU flashing, debugging, issue tracking, and software integration',
				'MIL, SIL, HIL, unit testing, integration testing, field testing, and data-driven calibration',
				'CI/CD workflows using GitLab, Jenkins, Git, Jira, and related development tooling',
			],
			chips: ['C/C++', 'MIL/SIL/HIL', 'CI/CD'],
		},
		{
			title: 'Diagnostics, Safety, and Robustness',
			items: [
				'Diagnostic strategies for thermal systems, engine systems, fuel systems, and control software',
				'Root-cause reasoning, degradation logic, field data analysis, and validation evidence for safety-related production environments',
				'Functional safety context with ISO 26262-aligned development',
				'Fault handling, fallback strategies, monitoring, and robustness-oriented design',
				'A-SPICE and traceability-aware engineering practices',
			],
			chips: ['ISO 26262', 'A-SPICE', 'Diagnostics'],
		},
		{
			title: 'Technical Leadership',
			items: [
				'Technical leadership of embedded software engineers, including mentoring junior developers',
				'Planning, mentoring, delivery coordination, and cross-functional alignment across automotive organizations',
				'Agile, Scrum, Kanban, SAFe, and CI/CD delivery environments',
				'Interface between system engineering, software development, validation, suppliers, and project stakeholders',
			],
			chips: ['Mentoring', 'Delivery', 'Cross-functional'],
		},
	] satisfies ExpertiseGroup[],
	impactIntro:
		'Selected outcomes from embedded control software, electrification, diagnostics, autonomous systems, and applied control research.',
	impactHighlights: [
		{
			category: 'Leadership',
			title: 'Embedded software delivery',
			body: 'Led and mentored a team of 3 embedded software engineers developing model based automotive control software.',
		},
		{
			category: 'Electrification',
			title: 'Electric truck control software',
			body: 'Delivered embedded software for thermal management, battery systems, charger coordination, diagnostics, and validation.',
		},
		{
			category: 'Autonomous systems',
			title: 'Vehicle level motion control',
			body: 'Designed and integrated traction and speed control software for autonomous electric haulers.',
		},
		{
			category: 'Diagnostics',
			title: 'Fault tolerant control concepts',
			body: 'Developed control architecture and diagnostics for dual motor torque allocation and redundant actuator concepts.',
		},
		{
			category: 'Power electronics',
			title: 'Electrified system control',
			body: 'Created model based thermal and control software for e bike motor control, wireless charging, and DC/DC converter applications.',
		},
		{
			category: 'Research',
			title: 'Validated control research',
			body: 'Published results showing 25 to 75 percent reduction in controlled parameter dispersion, 60 percent reduction in pilot fuel mass estimation error, and up to 96 percent real time pilot misfire detection.',
		},
	] satisfies ImpactHighlight[],
	experience: [
		{
			title: 'Senior Developer Engineer',
			organization: 'Traton / Scania Assignment',
			dates: 'July 2025-Present',
			summary:
				'Embedded software for electric truck thermal management, battery systems, charger coordination, diagnostics, and real-time controller architecture.',
			highlights: [
				'Develop and validate thermal management software for batteries, auxiliaries, power electronics, and charging systems.',
				'Support predictive thermal control, diagnostics, functional safety analysis, and CI/CD integration.',
			],
			detailGroups: [
				{
					title: 'Technical details',
					items: [
						'Model calibration and validation across MIL, SIL, HIL, test bench, wind tunnel, test track, and vehicle environments.',
						'Battery management and SOC/SOH/SOP-related thermal control strategies.',
						'Functional safety analysis, diagnostics, fallback strategies, and ISO 26262 / A-SPICE-aligned workflows.',
						'GitLab CI/CD pipelines and SAFe Agile practices to improve integration quality and reduce development cycle time.',
					],
				},
				{
					title: 'Additional responsibilities',
					items: [
						'Cross-functional coordination across Traton and Scania R&D.',
						'Supplier coordination and traceable engineering practices.',
						'Controller architecture using model-based development.',
						'Calibration maturity tracking across simulation, bench, and vehicle environments.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'C', 'GitLab', 'ISO 26262', 'A-SPICE', 'BMS', 'diagnostics', 'EV thermal management'],
		},
		{
			title: 'Senior Software Developer / Technical Leader',
			organization: 'Alten Delivery Center',
			location: 'Valencia, Spain',
			dates: '2023-Present',
			summary:
				'Technical lead for embedded automotive software development assignments, coordinating delivery and mentoring a small engineering team.',
			highlights: [
				'Provide technical leadership to a team of 3 engineers in embedded software development.',
				'Coordinate planning, technical quality, mentoring, and client assignment delivery.',
			],
			detailGroups: [
				{
					title: 'Additional responsibilities',
					items: [
						'System requirements and architecture design for embedded automotive software assignments.',
						'Controller implementation, validation, debugging, and issue tracking.',
						'Knowledge sharing across Agile and CI/CD workflows.',
						'Alten Key People program for mentoring and project management.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'C/C++', 'ISO 26262', 'Agile', 'CI/CD', 'SIL/HIL', 'technical leadership'],
		},
		{
			title: 'Senior Developer Engineer',
			organization: 'Volvo CE Assignment',
			dates: 'April 2022-December 2024',
			summary:
				'Propulsion control software for autonomous electric haulers, including traction control, speed control, torque allocation, diagnostics, and functional safety.',
			highlights: [
				'Developed and integrated traction and speed control functionality for autonomous electric haulers.',
				'Designed propulsion torque control architecture for dual electric motors and redundant actuator concepts.',
			],
			detailGroups: [
				{
					title: 'Validation scope',
					items: [
						'Unit tests, integration tests, SIL/HIL, and vehicle evaluations in manual and autonomous modes.',
						'Safety-related speed control and monitoring software.',
						'Debugging, tuning, issue tracking, and system-level evaluations.',
						'Mentoring and support for junior developers.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'ISO 26262', 'SIL', 'HIL', 'diagnostics', 'data analysis', 'autonomous vehicle control', 'propulsion control'],
		},
		{
			title: 'Development Software Engineer',
			organization: 'Mahle Electronics',
			location: 'Valencia, Spain',
			dates: '2022-2023',
			summary:
				'Electric mobility software for e-bike motor control, power electronics interfaces, thermal modeling, and AUTOSAR-oriented software architecture.',
			highlights: [
				'Led software development for an e-bike motor control project.',
				'Implemented application-layer software for wireless battery charging and DC/DC converter functionality.',
			],
			detailGroups: [
				{
					title: 'Technical details',
					items: [
						'Developed and calibrated a virtual PMSM motor temperature model with approximately 98% accuracy.',
						'Optimized PMSM electric motor controller behavior.',
						'Developed model-based software strategy for an adaptive platform using AUTOSAR-oriented methods.',
						'Acted as Scrum Master and contributed to Automotive SPICE methodology implementation.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'C', 'C++', 'Classic AUTOSAR', 'CANalyzer', 'Agile', 'PMSM', 'model-based development'],
		},
		{
			title: 'Senior Development Engineer',
			organization: 'Scania',
			location: 'Sodertalje, Sweden',
			dates: '2021-2022',
			summary:
				'Developed embedded control software for electric powertrain thermal management and battery management functions in heavy-duty vehicle applications.',
			highlights: [
				'Designed control architecture for thermal management in electric powertrains.',
				'Developed estimation methods for state of charge, state of power, and state of health in mild-hybrid vehicle batteries.',
			],
			detailGroups: [
				{
					title: 'Technical details',
					items: [
						'Passive and active cooling control integration across cabin climate, fans, heat pumps, batteries, and electric motors.',
						'Control and diagnosis concepts for electric truck thermal management and BMS functionality.',
						'Supplier contact, calibration maturity tracking, debugging, issue tracking, ECU flashing, and patent applications.',
						'Implementation and testing of control software for electric vehicles.',
					],
				},
				{
					title: 'Validation scope',
					items: [
						'MIL validation for model behavior and software logic.',
						'SIL and HIL validation for generated software and integration behavior.',
						'Bench, wind tunnel, test track, and on-road validation.',
						'Data analysis and calibration maturity tracking.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'C', 'C++', 'Jenkins', 'Git', 'ISO 26262', 'BMS', 'thermal management'],
		},
		{
			title: 'Industrial PhD Student',
			organization: 'Scania and Lund University',
			location: 'Sodertalje, Sweden',
			dates: '2016-2021',
			summary:
				'Conducted industrial PhD research on real-time diagnostics and in-cycle closed-loop combustion control for heavy-duty diesel engines operating with biofuels.',
			highlights: [
				'Developed real-time model-based diagnostics and control algorithms for heavy-duty engine combustion systems.',
				'Designed and implemented in-cycle closed-loop combustion control concepts using FPGA and LabVIEW.',
			],
			detailGroups: [
				{
					title: 'Technical details',
					items: [
						'Virtual sensors, stochastic detection methods, predictive models, and online adaptation strategies.',
						'Experiments, data analysis, calibration, and validation on test benches and prototype systems.',
						'Peer-reviewed publications, patent applications, conference representation, and thesis mentoring.',
						'Research on heavy-duty diesel engines operating with biofuels.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'LabVIEW', 'FPGA', 'signal processing', 'stochastic modeling', 'model calibration', 'experimental validation'],
		},
		{
			title: 'Development Engineer',
			organization: 'Scania',
			location: 'Sodertalje, Sweden',
			dates: '2014-2016',
			summary:
				'Developed embedded control and diagnostic software for heavy-duty engine systems, oil systems, cooling systems, and safety-related functionality.',
			highlights: [
				'Developed software for engine diagnostics, calibration, and safety functionality using model-based methods and C-code generation.',
				'Implemented control and diagnostic functions for oil level, oil pressure, warning handling, and driver display information.',
			],
			detailGroups: [
				{
					title: 'Technical details',
					items: [
						'Concepts for controllable cooling systems, controllable oil pumps, and oil degradation models.',
						'Validation using MIL, SIL, HIL, test bench, wind tunnel, test track, and on-road testing.',
						'ECU flashing, issue tracking, supplier contact, patent applications, and thesis mentoring.',
						'Generated C-code workflows for model-based embedded software.',
					],
				},
			],
			tags: ['MATLAB/Simulink', 'C', 'C++', 'Jenkins', 'Perforce', 'Vision', 'Jira', 'diagnostics', 'functional safety'],
		},
	] satisfies ExperienceItem[],
	earlierExperience: [
		{
			title: 'Master Thesis Student',
			organization: 'Scania',
			dates: '2014',
			summary: 'Master thesis on automatic control for a low-pressure fuel system in heavy-duty vehicles.',
			bullets: [
				'Built and evaluated a test-rig control strategy using MATLAB/Simulink.',
				'Contributed to real-time control algorithm and patent-related work.',
			],
		},
		{
			title: 'Hardware Engineer',
			organization: 'Arduino Verkstad',
			dates: '2014',
			summary: 'Short-term hardware engineering work focused on educational electronics platforms and embedded prototyping.',
			bullets: [
				'Designed and produced PCB circuits for TinkerKit-based educational projects.',
				'Created documentation for Arduino courses and maker education materials.',
			],
		},
		{
			title: 'Software Researcher',
			organization: 'Sony Mobile Communications',
			dates: 'May 2013-August 2013',
			summary: 'Engineering internship in mobile R&D focused on predictive algorithms for reduced touchscreen latency.',
			bullets: [
				'Researched predictive screen interaction models for improved responsiveness.',
				'Implemented selected algorithms at Android kernel level for real-time evaluation.',
			],
		},
	] satisfies CompactExperienceItem[],
	caseStudies: [
		{
			eyebrow: 'EV systems',
			title: 'Electric Truck Thermal Management and Battery Systems',
			statement:
				'Embedded control software for battery, auxiliary, power electronics, and charging thermal coordination in heavy-duty electric vehicles.',
			role: 'Senior developer engineer',
			focus: 'BMS / thermal control / diagnostics',
			proof: 'MIL/SIL/HIL / vehicle testing / ISO 26262 context',
			href: '/work#electric-truck-thermal-management',
		},
		{
			eyebrow: 'Autonomous machines',
			title: 'Autonomous Electric Hauler Propulsion Control',
			statement:
				'Propulsion and speed-control software for autonomous electric haulers operating in demanding off-road environments.',
			role: 'Senior developer engineer / technical lead',
			focus: 'Traction control / torque allocation / diagnostics',
			proof: 'Dual motors / redundant actuators / SIL/HIL / vehicle testing',
			href: '/work#autonomous-hauler-propulsion-control',
		},
		{
			eyebrow: 'Power electronics',
			title: 'E-Bike Motor Control and Power Electronics Software',
			statement:
				'Embedded software for e-bike motor control, wireless charging, DC/DC conversion, and PMSM thermal modeling.',
			role: 'Software lead / Scrum Master',
			focus: 'PMSM / AUTOSAR / power electronics',
			proof: '98% thermal model accuracy / bench validation / Agile delivery',
			href: '/work#ebike-motor-control-power-electronics',
		},
		{
			eyebrow: 'Real-time control research',
			title: 'Heavy-Duty Engine Diagnostics and Control Research',
			statement:
				'Real-time control and diagnostic algorithms for heavy-duty combustion systems with experimental validation.',
			role: 'Industrial PhD researcher',
			focus: 'Closed-loop control / virtual sensing / stochastic detection',
			proof: 'Patents / publications / test-bench validation',
			href: '/work#heavy-duty-engine-diagnostics-control-research',
		},
	] satisfies CaseStudy[],
	research: {
		intro:
			'Research evidence behind my work in real time control, virtual sensing, diagnostics, stochastic modeling, and hardware constrained implementation for heavy duty physical systems.',
		themes: [
			'Closed loop combustion control',
			'Virtual sensing and diagnostics',
			'Stochastic detection and estimation',
			'Predictive control and model adaptation',
			'Real time hardware implementation',
			'Experimental validation',
		],
		outcomes: [
			{
				value: '25 to 75%',
				label: 'Reduced controlled parameter dispersion',
			},
			{
				value: '60%',
				label: 'Reduced pilot fuel mass estimation error',
			},
			{
				value: 'Up to 96%',
				label: 'Real time pilot misfire detection',
			},
		] satisfies ResearchOutcome[],
		relevance:
			'This research background informs my production engineering work: building models that are useful, validating them against real systems, and turning control concepts into software that can run under timing, hardware, and reliability constraints.',
		workHref: '/work',
		evidence: [
			{ value: '5', label: 'Patent records', description: 'Control, diagnostics, and combustion related inventions' },
			{ value: '15+', label: 'Scientific publications', description: 'Real time control, diagnostics, estimation, and validation' },
			{ value: 'PhD', label: 'Industrial research', description: 'Scania and Lund University' },
		] satisfies ResearchMetric[],
	},
	education: [
		{
			degree: 'PhD, Mechanical Engineering',
			year: '2021',
			institution: 'Lund University',
			dissertation: 'Design and Optimization of In Cycle Closed Loop Combustion Control with Multiple Injection',
			description:
				'Industrial PhD with Scania focused on real time control, diagnostics, virtual sensing, stochastic detection, FPGA based implementation, and experimental validation for heavy duty diesel engines.',
			links: [
				{
					label: 'Thesis publication',
					href: 'https://portal.research.lu.se/portal/files/96902493/PhD_Thesis_Open.pdf',
				},
				{
					label: 'Thesis presentation',
					href: 'https://www.youtube.com/watch?v=vTkDS-V9lFw',
				},
				{
					label: 'Research context',
					href: '/work',
				},
			],
		},
		{
			degree: 'MSc, Electrical Engineering',
			year: '2014',
			institution: 'Lund University',
			focus: 'Automatic control and automation.',
			description:
				'Specialized in control systems, embedded software, mechatronics, signal processing, optimal control, power electronics, and robotics. Master thesis at Scania on a multi pump fuel control system with real time control algorithms and patent work.',
		},
		{
			degree: 'MSc, Industrial Engineering',
			year: '2014',
			institution: 'Polytechnic University of Valencia',
			focus: 'Electronics and automation.',
			description:
				'Multidisciplinary engineering program covering mechanical, electrical, electronic, control, automation, and energy systems. Graduated with honors and received academic scholarships and recognition.',
		},
	] satisfies EducationItem[],
        toolsIntro:
                'A snapshot of the tools, methods, standards, languages, and learning habits that support my work across embedded control software, validation, diagnostics, and production delivery.',
        tools: [
                {
                        title: 'Control and Modeling',
                        primaryTools: 'MATLAB · Simulink · Stateflow · Embedded Coder · LabVIEW',
                        methods:
                                'Model based development, system identification, calibration, observer design, virtual sensing, model adaptation, signal processing, Kalman filtering, stochastic modeling, optimization, model predictive control.',
                },
                {
                        title: 'Embedded Software',
                        primaryTools: 'C · C++ · Python · CAPL · LabVIEW FPGA · ECU flashing',
                        methods:
                                'Real time embedded implementation, generated code integration, diagnostics implementation, scripting, automation, AUTOSAR oriented workflows, hardware constrained algorithms.',
                },
                {
                        title: 'Validation and Testing',
                        primaryTools: 'MIL · SIL · HIL · CANalyzer · CANoe · Google Test',
                        methods:
                                'Test bench validation, vehicle validation, wind tunnel, test track, on road testing, regression testing, fault injection, calibration support, ECU debugging.',
                },
                {
                        title: 'Delivery and Collaboration',
                        primaryTools: 'Git · GitLab · Jenkins · Jira · CI/CD · SAFe',
                        methods:
                                'Code review, issue tracking, requirements alignment, architecture coordination, release workflows, agile delivery, continuous integration, mentoring, cross functional coordination.',
                },
                {
                        title: 'Standards and Automotive Context',
                        primaryTools: 'ISO 26262 · A SPICE · AUTOSAR · CAN/J1939 · Functional Safety',
                        methods:
                                'Functional safety awareness, FuSa analysis, process alignment, automotive communication, traceability, production oriented documentation.',
                },
                {
                        title: 'Languages',
                        languages: [
                                { language: 'Spanish', level: 'native' },
                                { language: 'Catalan', level: 'native' },
                                { language: 'English', level: 'full professional' },
                                { language: 'Swedish', level: 'full professional' },
                        ],
                },
        ] satisfies ToolGroup[],
        learningRecognition: {
                recognition: [
                        'Outstanding Oral Presentation Award, SAE, 2017',
                        'Scania Innovation Challenge, Scania, 2019',
                        'Best Academic Record for First Year, Polytechnic University of Valencia, 2009',
                        'Double Degree Scholarship, COIICV, 2013',
                ],
                recentLearning: [
                        'LangChain and LLMs with Python, Alten, 2025',
                        'Project Management: Product Owner and Kanban, Cualtis, 2024',
                        'Power Electronic Converters, 2022',
                        'Introduction to Electromobility, Swedish Electromobility Centre, 2020',
                        'GT Power, Gamma Technologies, 2015',
                ],
        } satisfies LearningRecognition,
} as const;
