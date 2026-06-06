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
};

export type ExperienceItem = {
	title: string;
	organization?: string;
	location?: string;
	dates: string;
	summary: string;
	highlights: string[];
	details: string[];
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
	title: string;
	context: string;
	role: string;
	focus: string;
	contribution: string;
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
			'Senior electronics and embedded controls engineer with 10+ years of experience developing real-time control software for automotive and heavy-duty vehicle systems. I work at the intersection of automatic control, model-based development, diagnostics, functional safety, validation, and production embedded software.',
		secondarySummary:
			'My background spans electric trucks, battery and powertrain thermal management, autonomous electric haulers, power electronics interfaces, heavy-duty engine diagnostics, and industrial research in real-time control. I translate control concepts into robust, testable, safety-aware embedded software for complex physical systems.',
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
		{ value: '10+', label: 'years embedded controls' },
		{ value: 'EV', label: 'thermal management and BMS' },
		{ value: 'Autonomous', label: 'propulsion control' },
		{ value: 'ISO 26262', label: 'and A-SPICE context' },
		{ value: '5', label: 'patent records' },
		{ value: '15+', label: 'scientific publications' },
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
				'Develop embedded software for electric truck thermal management, battery-related control functions, charger thermal coordination, diagnostics, and real-time controller architecture within cross-functional Traton and Scania R&D environments.',
			highlights: [
				'Develop software for thermal management of electric powertrains, auxiliaries, batteries, and charging systems.',
				'Work on predictive thermal management concepts for EV energy optimization and battery life.',
				'Design software architecture for real-time controllers using model-based development.',
				'Support battery management and SOC/SOH-optimized thermal control strategies.',
				'Develop, calibrate, and validate models across simulation, bench, and vehicle environments.',
			],
			details: [
				'Contribute to functional safety analysis, diagnostics, fallback strategies, and ISO 26262 / A-SPICE-aligned workflows.',
				'Use GitLab CI/CD pipelines and SAFe Agile practices to improve integration quality and reduce development cycle time.',
				'Coordinate with suppliers and cross-functional engineering teams across Traton R&D.',
			],
			tags: ['MATLAB/Simulink', 'C', 'GitLab', 'CI/CD', 'ISO 26262', 'A-SPICE', 'SAFe', 'MIL/SIL/HIL', 'EV thermal management', 'BMS'],
		},
		{
			title: 'Senior Software Developer / Technical Leader',
			organization: 'Alten Delivery Center',
			location: 'Valencia, Spain',
			dates: '2023-Present',
			summary:
				'Technical leader for embedded automotive software development assignments, coordinating engineering delivery and mentoring a small team of embedded software engineers.',
			highlights: [
				'Provide technical leadership to a team of 3 engineers in embedded software development.',
				'Coordinate task planning, delivery alignment, and technical quality for client assignments.',
				'Support system requirements, architecture design, controller implementation, SIL/HIL validation, on-road testing, debugging, and issue tracking.',
				'Mentor junior engineers and support knowledge sharing across Agile and CI/CD workflows.',
			],
			details: ["Participate in Alten's Key People program for mentoring and project management."],
			tags: ['MATLAB/Simulink', 'C/C++', 'ISO 26262', 'CI/CD', 'Agile', 'SIL/HIL', 'technical leadership'],
		},
		{
			title: 'Senior Developer Engineer',
			organization: 'Volvo CE Assignment',
			dates: 'April 2022-December 2024',
			summary:
				'Led development and integration of propulsion control software for autonomous electric haulers, focusing on traction control, speed control, torque allocation, diagnostics, and functional safety.',
			highlights: [
				'Developed and integrated traction control functionality for autonomous electric haulers.',
				'Designed controller architecture for propulsion torque control with individual axle control and dual electric motors.',
				'Investigated torque allocation concepts with redundant actuators.',
				'Developed functional safety-related speed control and monitoring software.',
				'Delivered SIL/HIL testing and vehicle evaluations in manual and autonomous modes.',
			],
			details: [
				'Delivered unit tests, integration tests, diagnostics, issue tracking, data analysis, tuning, debugging, and system-level evaluations.',
				'Mentored and supported junior developers.',
			],
			tags: ['MATLAB/Simulink', 'ISO 26262', 'SIL', 'HIL', 'diagnostics', 'data analysis', 'autonomous vehicle control', 'propulsion control'],
		},
		{
			title: 'Development Software Engineer',
			organization: 'Mahle Electronics',
			location: 'Valencia, Spain',
			dates: '2022-2023',
			summary:
				'Worked on electric mobility software, motor control, power electronics interfaces, model-based development strategy, and AUTOSAR-oriented platform work.',
			highlights: [
				'Led software development for an e-bike motor control project.',
				'Implemented application-layer software for wireless battery charging and DC/DC converter functionality.',
				'Developed and calibrated a virtual PMSM motor temperature model with approximately 98% accuracy.',
				'Optimized PMSM electric motor controller behavior.',
				'Developed model-based software strategy for an adaptive platform using AUTOSAR-oriented methods.',
			],
			details: [
				'Acted as Scrum Master, supporting sprint planning, retrospectives, Jira workflows, and Agile improvement.',
				'Contributed to Automotive SPICE methodology implementation.',
			],
			tags: ['MATLAB/Simulink', 'C', 'C++', 'Classic AUTOSAR', 'CANalyzer', 'CANoe', 'SVN', 'Jira', 'Agile', 'PMSM'],
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
				'Implemented and tested control software for electric vehicles.',
				'Developed estimation methods for state of charge, state of power, and state of health in mild-hybrid vehicle batteries.',
				'Worked on passive and active cooling control integration across cabin climate, fans, heat pumps, batteries, and electric motors.',
				'Investigated control and diagnosis concepts for electric truck thermal management and BMS functionality.',
			],
			details: [
				'Planned and executed validation in MIL, SIL, HIL, test bench, wind tunnel, test track, and on-road environments.',
				'Supported supplier contact, calibration maturity tracking, debugging, issue tracking, ECU flashing, and patent applications.',
			],
			tags: ['MATLAB/Simulink', 'C', 'C++', 'Jenkins', 'Git', 'Jira', 'ISO 26262', 'model-based development', 'BMS', 'thermal management'],
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
				'Developed virtual sensors, stochastic detection methods, predictive models, and online adaptation strategies.',
				'Planned experiments, collected data, analyzed results, calibrated models, and validated control algorithms on test benches and prototype systems.',
			],
			details: [
				'Published multiple peer-reviewed papers and contributed to several patent applications.',
				'Represented Scania at international conferences and innovation forums.',
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
				'Developed concepts for controllable cooling systems, controllable oil pumps, and oil degradation models.',
				'Planned and executed software validation using MIL, SIL, HIL, test bench, wind tunnel, test track, and on-road testing.',
			],
			details: ['Supported ECU flashing, issue tracking, supplier contact, patent applications, and thesis mentoring.'],
			tags: ['MATLAB/Simulink', 'C', 'C++', 'Jenkins', 'Perforce', 'Vision', 'Jira', 'model-based development', 'diagnostics', 'functional safety'],
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
			title: 'Electric Truck Thermal Management and Battery Systems',
			context:
				'Electric and hybrid commercial vehicles require coordinated thermal control across batteries, auxiliaries, power electronics, cabin systems, and charging interfaces.',
			role: 'Senior developer engineer / embedded controls specialist.',
			focus:
				'Battery thermal management, predictive thermal control, charger thermal coordination, diagnostics, software architecture, functional safety, calibration, and validation.',
			contribution:
				'Developed model-based embedded software, supported architecture design, integrated CI/CD workflows, contributed to functional safety analysis, and validated control behavior across simulation, bench, and vehicle environments.',
		},
		{
			title: 'Autonomous Electric Hauler Propulsion Control',
			context: 'Autonomous electric haulers require reliable propulsion and speed control in demanding off-road environments.',
			role: 'Senior developer engineer / technical lead.',
			focus:
				'Traction control, speed control, torque allocation, redundant actuators, dual electric motors, diagnostics, functional safety, SIL/HIL testing, and vehicle validation.',
			contribution:
				'Developed and integrated propulsion control software, designed torque allocation concepts, implemented diagnostics, supported safety-related monitoring, and led debugging and validation activities.',
		},
		{
			title: 'E-Bike Motor Control and Power Electronics Software',
			context:
				'Electric mobility platforms require embedded software for motor control, power electronics interfaces, thermal modeling, and AUTOSAR-oriented software architecture.',
			role: 'Software lead and Scrum Master.',
			focus:
				'PMSM motor control, virtual temperature sensing, wireless charging, DC/DC converter interfaces, model-based development, Classic AUTOSAR, test-bench validation, and Agile delivery.',
			contribution:
				'Led software development, developed and calibrated a PMSM thermal model, implemented application software, supported Automotive SPICE practices, and coordinated Agile delivery routines.',
		},
		{
			title: 'In-Cycle Combustion Control and Real-Time Diagnostics',
			context:
				'Heavy-duty engines operating with biofuels require robust control strategies that can handle combustion variability, emissions constraints, and real-time execution limits.',
			role: 'Industrial PhD researcher.',
			focus:
				'In-cycle closed-loop control, virtual sensing, stochastic detection, predictive modeling, online adaptation, FPGA implementation, signal processing, and experimental validation.',
			contribution:
				'Developed and validated control and diagnostic algorithms, implemented real-time concepts on FPGA, published scientific results, contributed to patents, and demonstrated improvements in combustion control accuracy, robustness, and efficiency.',
		},
	] satisfies CaseStudy[],
	research: {
		intro:
			'My research work focused on real-time control, diagnostics, virtual sensing, stochastic modeling, and hardware-constrained implementation for heavy-duty combustion systems. The work connects automatic control theory with embedded implementation and experimental validation.',
		themes: [
			'In-cycle closed-loop combustion control',
			'Real-time model-based diagnostics and virtual sensing',
			'Stochastic detection and Bayesian estimation',
			'Predictive control and online model adaptation',
			'FPGA implementation of real-time control and signal-processing methods',
			'Experimental validation on heavy-duty engine platforms',
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
			title: 'Control, Modeling, and Data',
			items: ['MATLAB', 'Simulink', 'LabVIEW', 'model-based development', 'system identification', 'calibration', 'signal processing', 'data analysis', 'stochastic modeling', 'optimization', 'model predictive control', 'dynamic modeling'],
		},
		{
			title: 'Embedded Software',
			items: ['C', 'C++', 'CAPL', 'Python', 'Java', 'Eclipse', 'Visual Studio', 'ECU flashing', 'generated code workflows', 'real-time embedded implementation'],
		},
		{
			title: 'Validation and Testing',
			items: ['MIL', 'SIL', 'HIL', 'unit testing', 'integration testing', 'system testing', 'test bench', 'wind tunnel', 'test track', 'on-road testing', 'CANalyzer', 'CANoe', 'Vision', 'Google Test'],
		},
		{
			title: 'Automotive Standards and Process',
			items: ['ISO 26262', 'A-SPICE', 'AUTOSAR', 'CAN / J1939', 'functional safety', 'diagnostics', 'fault handling', 'fallback strategies', 'requirements traceability'],
		},
		{
			title: 'Collaboration and Delivery',
			items: ['Git', 'GitLab', 'Jenkins', 'SVN', 'Jira', 'CI/CD', 'Agile', 'Scrum', 'Kanban', 'SAFe', 'technical documentation', 'supplier coordination', 'mentoring'],
		},
	] satisfies ToolGroup[],
	languages: [
		{ language: 'Spanish', level: 'Native' },
		{ language: 'Catalan', level: 'Native' },
		{ language: 'English', level: 'Full professional' },
		{ language: 'Swedish', level: 'Full professional' },
	],
	coursesAndRecognition: [
		'LangChain and LLMs with Python - Alten, 2025',
		'Project Management: Product Owner + Kanban - Cualtis, 2024',
		'Power Electronic Converters - 2022',
		'Introduction to Electromobility - Swedish Electromobility Centre, 2020',
		'Scania Innovation Challenge - Scania, 2019',
		'Outstanding Oral Presentation Award - SAE, 2017',
		'GT-Power - Gamma Technologies, 2015',
		'Control of Mobile Robots - Coursera, 2013',
	],
} as const;
