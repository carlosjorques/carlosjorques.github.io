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

export type ExpertiseGroup = {
	title: string;
	items: string[];
	chips?: string[];
	evidence?: string[];
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
};

export type EducationItem = {
	degree: string;
	year: string;
	focus?: string;
	dissertation?: string;
	description: string;
	links?: { label: string; href: string }[];
};

export type ToolGroup = {
	title: string;
	items: string[];
};

export type CourseGroup = {
	featured: string[];
	additional: string[];
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
		subtitle: 'Senior Electronics Engineer | Embedded Controls Architect | Electric & Autonomous Vehicle Systems',
		summary:
			'Senior electronics and embedded controls engineer with 10+ years of experience developing real-time control software for automotive and heavy-duty vehicle systems. Focused on EV thermal management, BMS, autonomous propulsion control, diagnostics, functional safety, validation, and production embedded software.',
		secondarySummary:
			'I translate automatic control concepts into robust, testable, safety-aware embedded software for complex physical systems across electric vehicles, autonomous machines, power electronics, and industrial control applications.',
	},
	actions: [
		{ label: 'Download PDF CV', href: '/cv/Carlos_Jorques_CV.pdf', primary: true, download: true, analytics: 'cv_pdf_download' },
		{ label: 'Contact Carlos', href: '/contact', analytics: 'cv_contact_click' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/carlosjorques/', external: true, analytics: 'cv_linkedin_click' },
		{ label: 'Selected Work', href: '/work', analytics: 'cv_selected_work_click' },
	] satisfies CvAction[],
	sectionNav: [
		{ label: 'Summary', href: '#summary' },
		{ label: 'Expertise', href: '#expertise' },
		{ label: 'Impact', href: '#impact' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Case Studies', href: '#case-studies' },
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
				'Functional safety context with ISO 26262-aligned development',
				'Fault handling, fallback strategies, monitoring, and robustness-oriented design',
				'A-SPICE and traceability-aware engineering practices',
			],
			chips: ['ISO 26262', 'A-SPICE', 'Diagnostics'],
		},
		{
			title: 'Technical Leadership',
			items: [
				'Technical leadership of embedded software engineers',
				'Planning, mentoring, delivery coordination, and cross-functional alignment',
				'Agile, Scrum, Kanban, SAFe, and CI/CD delivery environments',
				'Interface between system engineering, software development, validation, suppliers, and project stakeholders',
			],
			chips: ['Mentoring', 'Delivery', 'Cross-functional'],
		},
	] satisfies ExpertiseGroup[],
	impactHighlights: [
		'Led and mentored a team of 3 embedded software engineers delivering model-based automotive software.',
		'Developed embedded software for electric truck thermal management, battery systems, charger integration, diagnostics, and validation.',
		'Designed and integrated traction and speed control software for autonomous electric haulers.',
		'Developed control architecture and diagnostics for dual-motor torque allocation and redundant actuator concepts.',
		'Created model-based thermal and control software for e-bike motor control, wireless charging, and DC/DC converter applications.',
		'Developed real-time combustion control and diagnostic algorithms during an industrial PhD, resulting in publications and patent records.',
		'Published research results include 25-75% reduction in controlled-parameter dispersion, 60% reduction in pilot fuel mass estimation error, and up to 96% real-time pilot misfire detection.',
	],
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
		},
		{
			eyebrow: 'Autonomous machines',
			title: 'Autonomous Electric Hauler Propulsion Control',
			statement:
				'Propulsion and speed-control software for autonomous electric haulers operating in demanding off-road environments.',
			role: 'Senior developer engineer / technical lead',
			focus: 'Traction control / torque allocation / diagnostics',
			proof: 'Dual motors / redundant actuators / SIL/HIL / vehicle testing',
		},
		{
			eyebrow: 'Power electronics',
			title: 'E-Bike Motor Control and Power Electronics Software',
			statement:
				'Embedded software for e-bike motor control, wireless charging, DC/DC conversion, and PMSM thermal modeling.',
			role: 'Software lead / Scrum Master',
			focus: 'PMSM / AUTOSAR / power electronics',
			proof: '98% thermal model accuracy / bench validation / Agile delivery',
		},
		{
			eyebrow: 'Real-time control research',
			title: 'In-Cycle Combustion Control and Real-Time Diagnostics',
			statement:
				'Real-time control and diagnostic algorithms for heavy-duty combustion systems with FPGA implementation and experimental validation.',
			role: 'Industrial PhD researcher',
			focus: 'Closed-loop control / virtual sensing / stochastic detection',
			proof: 'Patents / publications / test-bench validation',
		},
	] satisfies CaseStudy[],
	research: {
		intro:
			'Research evidence showing depth in real-time control, virtual sensing, stochastic modeling, and hardware-constrained implementation for heavy-duty physical systems.',
		themes: [
			'In-cycle closed-loop combustion control',
			'Real-time model-based diagnostics and virtual sensing',
			'Stochastic detection and Bayesian estimation',
			'Predictive control and online model adaptation',
			'FPGA implementation of real-time control and signal-processing methods',
			'Experimental validation on heavy-duty engine platforms',
		],
		outcomes: [
			'Published research results include 25-75% reduction in controlled-parameter dispersion.',
			'Published research results include 60% reduction in pilot fuel mass estimation error.',
			'Published research results include up to 96% real-time pilot misfire detection.',
		],
		evidence: [
			{ value: '5', label: 'patent records' },
			{ value: '15+', label: 'scientific publications' },
			{ value: 'PhD', label: 'industrial research with Scania and Lund University' },
		],
		patents: [
			'Method and system for determining in-cycle a pilot injection fuel mass in a combustion chamber of an engine',
			'Method and system for fuel pump regulation',
			'System and method for improving heat release evaluation at a reciprocating internal combustion engine',
			'Method and system for diagnosing a fuel system',
			'Method and system for diagnosing a fuel system II',
		],
		selectedPublications: [
			'Indicated efficiency optimization by in-cycle closed-loop combustion control of diesel engines',
			'Modular Design and Integration of In-Cycle Closed-Loop Combustion Controllers for a Wide Range of Operating Conditions',
			'Stochastic Set-Point Optimization for In-Cycle Closed-Loop Combustion Control Operation',
			'In-Cycle Closed-Loop Combustion Control for Pilot Misfire Compensation',
			'Multi-Cylinder Adaptation of In-Cycle Predictive Combustion Models',
			'Predictive In-Cycle Closed-Loop Combustion Control with Pilot-Main Injections',
			'Bayesian Method for Fuel Mass Estimation of Short Pilot Injections Based on its Misfire Probability',
			'Cylinder Pressure-Based Virtual Sensor for In-Cycle Pilot Mass Estimation',
			'Cylinder Pressure-Based Method for In-Cycle Pilot Misfire Detection',
		],
		additionalPublications: [
			'FPGA Implementation of In-Cycle Closed-Loop Combustion Control Methods',
			'In-Cycle Closed-Loop Combustion Controllability with Pilot-Main Injections',
			'Internal Combustion Engine Cylinder Volume Trace Deviation',
			'Influence of small Pilot on Main Injection in a Heavy Duty Diesel Engine',
			'Investigation of small Pilot Combustion in a Heavy Duty Diesel Engine',
		],
	},
	education: [
		{
			degree: 'PhD, Mechanical Engineering - Lund University',
			year: '2021',
			dissertation: 'Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injection',
			description:
				'Industrial PhD in collaboration with Scania, focused on real-time diagnostics and combustion control for heavy-duty diesel engines using biofuels. Developed model-based algorithms, FPGA-based controllers, virtual sensors, stochastic detection methods, and experimental validation strategies.',
			links: [
				{
					label: 'Thesis publication',
					href: 'https://portal.research.lu.se/portal/files/96902493/PhD_Thesis_Open.pdf',
				},
				{
					label: 'Thesis presentation',
					href: 'https://www.youtube.com/watch?v=vTkDS-V9lFw',
				},
			],
		},
		{
			degree: 'MSc, Electrical Engineering - Lund University',
			year: '2014',
			focus: 'Automatic control and automation.',
			description:
				'Specialized in control systems, embedded software, mechatronics, signal processing, optimal control, power electronics, and robotics. Master thesis at Scania on a multi-pump fuel control system with real-time control algorithms and patent work.',
		},
		{
			degree: 'MSc, Industrial Engineering - Polytechnic University of Valencia',
			year: '2014',
			focus: 'Electronics and automation.',
			description:
				'Multidisciplinary engineering program covering mechanical, electrical, electronic, control, automation, and energy systems. Graduated with honors and received academic scholarships and recognition.',
		},
	] satisfies EducationItem[],
	tools: [
		{
			title: 'Control & Modeling',
			items: ['MATLAB', 'Simulink', 'Stateflow', 'Embedded Coder', 'LabVIEW'],
		},
		{
			title: 'Embedded Software',
			items: ['C', 'C++', 'Python', 'CAPL', 'ECU flashing'],
		},
		{
			title: 'Validation',
			items: ['MIL', 'SIL', 'HIL', 'CANalyzer', 'CANoe', 'Google Test'],
		},
		{
			title: 'Standards',
			items: ['ISO 26262', 'A-SPICE', 'AUTOSAR', 'CAN/J1939'],
		},
		{
			title: 'Delivery',
			items: ['Git', 'GitLab', 'Jenkins', 'Jira', 'CI/CD', 'SAFe'],
		},
	] satisfies ToolGroup[],
	extendedTools: [
		{
			title: 'Control, Modeling, and Data',
			items: ['model-based development', 'system identification', 'calibration', 'signal processing', 'data analysis', 'stochastic modeling', 'optimization', 'model predictive control', 'dynamic modeling'],
		},
		{
			title: 'Embedded Software',
			items: ['Java', 'Eclipse', 'Visual Studio', 'generated code workflows', 'real-time embedded implementation'],
		},
		{
			title: 'Validation and Testing',
			items: ['unit testing', 'integration testing', 'system testing', 'test bench', 'wind tunnel', 'test track', 'on-road testing', 'Vision'],
		},
		{
			title: 'Process and Delivery',
			items: ['functional safety', 'diagnostics', 'fault handling', 'fallback strategies', 'requirements traceability', 'SVN', 'Agile', 'Scrum', 'Kanban', 'technical documentation', 'supplier coordination', 'mentoring'],
		},
	] satisfies ToolGroup[],
	languages: [
		{ language: 'Spanish', level: 'Native' },
		{ language: 'Catalan', level: 'Native' },
		{ language: 'English', level: 'Full professional' },
		{ language: 'Swedish', level: 'Full professional' },
	],
	coursesAndRecognition: {
		featured: [
			'Outstanding Oral Presentation Award - SAE',
			'Introduction to Electromobility - Swedish Electromobility Centre',
			'Project Management: Product Owner + Kanban',
			'LangChain and LLMs with Python',
		],
		additional: [
			'Power Electronic Converters',
			'Scania Innovation Challenge',
			'GT-Power',
			'Control of Mobile Robots',
		],
	} satisfies CourseGroup,
} as const;
