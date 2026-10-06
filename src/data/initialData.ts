import { Product, GalleryItem, EmployeeReport, Enquiry, HomepageContent, AboutContent, WebsiteSettings, User } from '../types';
import {
  generateAuthenticProductCardSvg,
  generateHeroBannerSvg,
  generateFacilitySvg,
  generateAwardMementoSvg
} from '../utils/productVisuals';

export const initialProducts: Product[] = [
  // 1. ACTION-SP
  {
    id: 'prod-action-sp',
    slug: 'action-sp',
    name: 'ACTION-SP™',
    genericName: 'Aceclofenac 100 mg, Paracetamol 325 mg, Serratiopeptidase 15 mg Tablets',
    composition: 'Aceclofenac 100 mg, Paracetamol 325 mg, Serratiopeptidase 15 mg Tablets',
    brandName: 'ACTION-SP',
    category: 'Pain Management',
    dosageForm: 'Tablets',
    packing: '10 x 10 Tablets in Blister Pack',
    headline: 'Ensure Relief from Pain and Inflammation with Triple Action',
    shortDescription: 'Triple action synergy of Aceclofenac, Paracetamol and Serratiopeptidase ending inflammation & pain with perfection.',
    detailedDescription: 'ACTION-SP™ provides triple action anti-inflammatory, analgesic, and anti-edematous power. Aceclofenac directly inhibits PGE-2 secretion, Paracetamol raises the pain threshold, and Serratiopeptidase rapidly reduces post-traumatic swelling and promotes tissue healing.',
    keyInformation: [
      {
        title: 'Aceclofenac',
        description: 'Directly inhibits PGE-2 secretion at site of inflammation. Stimulates synthesis of extracellular matrix of human articular cartilage. Effective relief from pain with faster action and lesser GI effects than Diclofenac.'
      },
      {
        title: 'Paracetamol',
        description: 'Produces analgesia by elevation of pain threshold. Well absorbed orally, peripherally acting analgesic. Gold standard in reducing fever.'
      },
      {
        title: 'Serratiopeptidase',
        description: 'Potent proteolytic enzyme. Speeds up tissue repair and healing. Clinically proven to reduce swelling by 50% on the 3rd day.'
      }
    ],
    indications: [
      'Pain & Inflammation',
      'Back Pain',
      'Neck/Shoulder Pain',
      'Sprains / Strains',
      'Tendonitis / Bursitis'
    ],
    features: [
      'Directly inhibits PGE-2 secretion at site of inflammation',
      'Reduces 50% swelling in 3rd day',
      'Ends inflammation & pain with perfection',
      'Superior GI tolerability profile'
    ],
    alsoAvailable: [
      {
        name: 'ACTION-P',
        composition: 'Aceclofenac 100 mg, Paracetamol 325 mg Tablets',
        dosageForm: 'Tablets'
      }
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'ACTION-SP',
      nameColor: '#1E295D',
      genericFormula: 'Aceclofenac 100 mg, Paracetamol 325 mg, Serratiopeptidase 15 mg Tablets',
      headline: 'Ensure Relief from Pain and Inflammation with Triple Action',
      tagline: 'Ends inflammation & pain with Perfection',
      type: 'tablet',
      themeColor: '#1E295D',
      accentColor: '#D8232A',
      alsoAvailable: 'ACTION-P',
      packingText: '10 x 10 Tablets',
      indications: ['Pain & Inflammation', 'Back Pain', 'Neck/Shoulder Pain', 'Sprains / Strains', 'Tendonitis / Bursitis'],
      keyPoints: [
        {
          title: 'Aceclofenac',
          points: [
            'Directly inhibits PGE-2 secretion at site of inflammation',
            'Stimulates extracellular matrix of articular cartilage',
            'Faster action & lesser GI than Diclofenac'
          ]
        },
        {
          title: 'Paracetamol',
          points: [
            'Produces analgesia by elevation of pain threshold',
            'Well absorbed orally, peripherally acting analgesic',
            'Gold standard in reducing fever'
          ]
        },
        {
          title: 'Serratiopeptidase',
          points: [
            'Potent proteolytic enzyme',
            'Speeds up tissue repair and healing',
            'Reduces 50% swelling in 3rd day'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: true,
    order: 1
  },

  // 2. GASTION
  {
    id: 'prod-gastion',
    slug: 'gastion',
    name: 'GASTION™',
    genericName: 'Rabeprazole Sodium 20 mg, Domperidone 30 mg (SR) Capsule',
    composition: 'Rabeprazole Sodium 20 mg, Domperidone 30 mg (SR) Capsule',
    brandName: 'GASTION',
    category: 'Gastroenterology',
    dosageForm: 'Capsules',
    packing: '10 x 10 Sustained-Release Capsules',
    headline: 'Provide Protection from Raining Acid in Stomach',
    shortDescription: 'Dual action proton pump inhibitor with sustained-release prokinetic providing round-the-clock protection from hyperacidity and reflux.',
    detailedDescription: 'GASTION™ delivers fastest acid suppression while correcting gastrointestinal motility. Rabeprazole rapidly decreases stomach acid and promotes ulcer healing, while Domperidone increases LES pressure and eliminates nausea and gastric fullness.',
    keyInformation: [
      {
        title: 'Rabeprazole',
        description: 'Fastest acid suppression. Decreases the amount of acid made in the stomach. An efficacious and safe regimen for H.pylori eradication and ulcer healing.'
      },
      {
        title: 'Domperidone',
        description: 'Increases GI emptying by increasing peristaltic tone. Relieves nausea and vomiting. Corrects motility and increases LES (Lower Esophageal Sphincter) pressure.'
      }
    ],
    indications: [
      'Gastritis',
      'Hyperacidity',
      'Peptic Ulcers',
      'GERD'
    ],
    features: [
      'Fastest acid suppression from day one',
      'Corrects gastric motility & increases LES pressure',
      'Dual Action for Round the Clock Relief',
      'Alu-Alu blister packaging'
    ],
    alsoAvailable: [
      {
        name: 'GASTION-20',
        composition: 'Rabeprazole Sodium Gastro-Resistant Tablet IP 20 mg',
        dosageForm: 'Gastro-Resistant Tablets'
      }
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'GASTION',
      nameColor: '#581845',
      genericFormula: 'Rabeprazole Sodium 20 mg, Domperidone 30 mg (SR) Capsule',
      headline: 'Provide Protection from Raining Acid in Stomach',
      tagline: 'Dual Action for Round the Clock Relief',
      type: 'capsule',
      themeColor: '#581845',
      accentColor: '#B71C1C',
      alsoAvailable: 'GASTION-20',
      packingText: '10 x 10 Capsules',
      indications: ['Gastritis', 'Peptic Ulcers', 'Hyperacidity', 'GERD'],
      keyPoints: [
        {
          title: 'Rabeprazole',
          points: [
            'Fastest acid suppression',
            'Decreases the amount of acid made in stomach',
            'Efficacious regimen for ulcer healing'
          ]
        },
        {
          title: 'Domperidone',
          points: [
            'Increases GI emptying by peristaltic tone',
            'Relieves nausea and vomiting',
            'Corrects motility and increases LES pressure'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: true,
    order: 2
  },

  // 3. BANKCOF-D
  {
    id: 'prod-bankcof-d',
    slug: 'bankcof-d',
    name: 'BANKCOF-D™',
    genericName: 'Dextromethorphan HBr 10 mg, Chlorpheniramine Maleate 2 mg, Phenylephrine HCl 5 mg / 5 ml',
    composition: 'Dextromethorphan Hydrobromide 10 mg, Chlorpheniramine Maleate 2 mg, Phenylephrine Hydrochloride 5 mg / 5 ml Syrup (100 ml)',
    brandName: 'BANKCOF-D',
    category: 'Anti-Infectives',
    dosageForm: 'Syrup',
    packing: '100 ml Sugar Free Strawberry Flavour Bottle',
    headline: 'Ease the Difficult Breathing',
    shortDescription: 'Triple cough formulation delivering non-sedating relief from allergic and dry cough conditions.',
    detailedDescription: 'BANKCOF-D provides targeted cough suppression without addiction, anti-histaminic relief from sneezing and watery eyes, and decongestant action against nasal blockage.',
    keyInformation: [
      {
        title: 'Dextromethorphan HBr',
        description: 'Offers effective anti-tussive & analgesic action. Devoid of constipating & addicting action.'
      },
      {
        title: 'Chlorpheniramine Maleate',
        description: 'Provides relief from allergic rhinitis through activity at H1 receptor. Suppresses histamine mediated allergic manifestations.'
      },
      {
        title: 'Phenylephrine HCl',
        description: 'Centrally acting antihistamine and vasoconstrictor. Provides potent relief against common cold, influenza & sinusitis.'
      }
    ],
    indications: [
      'Allergic Cough',
      'Dry Cough',
      'Chronic Idiopathic Urticaria',
      'Nasal Congestion'
    ],
    features: [
      'Relieves Congestion... Without Sedation',
      'Delicious Strawberry Flavour',
      '100% Sugar Free formula'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'BANKCOF-D',
      nameColor: '#8B152B',
      genericFormula: 'Dextromethorphan HBr 10 mg, CPM 2 mg, Phenylephrine HCl 5 mg / 5 ml Syrup',
      headline: 'Ease the Difficult Breathing',
      tagline: 'Relieves Congestion... Without Sedation',
      type: 'syrup',
      themeColor: '#8B152B',
      accentColor: '#E11D48',
      packingText: '100 ml Bottle',
      indications: ['Allergic Cough', 'Dry Cough', 'Chronic Idiopathic Urticaria', 'Nasal Congestion'],
      keyPoints: [
        {
          title: 'Dextromethorphan HBr',
          points: [
            'Offers effective anti-tussive action',
            'Devoid of constipating & addicting action',
            'Controls dry irritant cough'
          ]
        },
        {
          title: 'Chlorpheniramine',
          points: [
            'Relief from allergic rhinitis via H1 receptor',
            'Suppresses histamine-mediated symptoms',
            'Controls sneezing and watering eyes'
          ]
        },
        {
          title: 'Phenylephrine HCl',
          points: [
            'Potent relief against allergic conditions',
            'Clears blocked nasal passages',
            'Common cold & sinusitis decongestant'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: true,
    order: 3
  },

  // 4. LIFETION-XT
  {
    id: 'prod-lifetion-xt',
    slug: 'lifetion-xt',
    name: 'LIFETION-XT™',
    genericName: 'Ferrous Ascorbate 100 mg + Folic Acid 1.5 mg + Zinc sulphate 22.5 mg',
    composition: 'Ferrous Ascorbate 100 mg + Folic Acid 1.5 mg + Zinc sulphate 22.5 mg Tablet / Ferrous Glycine Sulphate Syrup',
    brandName: 'LIFETION-XT',
    category: 'Nutraceuticals',
    dosageForm: 'Tablets',
    packing: '10 x 10 Tablets / 200 ml Syrup',
    headline: 'When Haemoglobin Rise is inevitable... An Advance Iron Care with...',
    shortDescription: 'Advanced haematinic formulation with reference standard iron for optimal RBC production and anemia correction.',
    detailedDescription: 'LIFETION-XT offers highest bioavailability Ferrous Ascorbate proven to show 52% higher absorption than conventional ferrous sulphate, combined with Folic Acid and Zinc for pregnancy, lactation, and post-surgical recovery.',
    keyInformation: [
      {
        title: 'Ferrous Ascorbate',
        description: 'World\'s most widely recognized reference iron. Prevention & treatment of iron deficiency anaemia in pregnant women & children. Averaged 52% higher absorption than ferrous sulphate.'
      },
      {
        title: 'Folic Acid',
        description: 'Folic acid acts on megaloblastic bone marrow to produce a normo-blastic marrow. Essential for DNA synthesis and fetal neural development.'
      },
      {
        title: 'Zinc',
        description: 'Plays critical role in normal growth, cellular development, and increases O2 affinity of human haemoglobin.'
      }
    ],
    indications: [
      'Iron Deficiency Anemia',
      'Pregnancy & Lactation',
      'Post-Surgical Weakness',
      'Menorrhagia',
      'Hemorrhage'
    ],
    features: [
      'Best Iron with Best Results',
      'Non-constipating reference iron formulation',
      'Available in both Tablets and Syrup formats'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'LIFETION-XT',
      nameColor: '#881326',
      genericFormula: 'Ferrous Ascorbate 100 mg + Folic Acid 1.5 mg + Zinc 22.5 mg',
      headline: 'When Haemoglobin Rise is inevitable...',
      tagline: 'Best Iron with Best Results',
      type: 'tablet',
      themeColor: '#881326',
      accentColor: '#D97706',
      packingText: '10 x 10 Tablets / 200ml',
      indications: ['Iron Deficiency Anemia', 'Pregnancy', 'Lactation', 'Menorrhagia', 'Generalized Weakness'],
      keyPoints: [
        {
          title: 'Ferrous Ascorbate',
          points: [
            'World widely recognized reference iron',
            'Prevention of iron deficiency in pregnancy',
            '52% higher absorption than ferrous sulphate'
          ]
        },
        {
          title: 'Folic Acid',
          points: [
            'Acts on bone marrow to produce normo-blastic marrow',
            'Supports maternal DNA synthesis',
            'Prevents neural tube defects'
          ]
        },
        {
          title: 'Zinc',
          points: [
            'Critical role in normal growth and immunity',
            'Increases O2 affinity of hemoglobin',
            'Supports cellular enzyme function'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: true,
    order: 4
  },

  // 5. AZITION
  {
    id: 'prod-azition',
    slug: 'azition',
    name: 'AZITION™',
    genericName: 'Azithromycin 500 mg Tablets IP',
    composition: 'Azithromycin 500 mg Tablets IP',
    brandName: 'AZITION',
    category: 'Anti-Infectives',
    dosageForm: 'Tablets',
    packing: '10 x 3 Tablets in Blister Pack',
    headline: 'The hard hitting attack on Bacterial Infections...',
    shortDescription: 'High-tissue penetration broad spectrum macrolide antibiotic delivering rapid bactericidal eradication.',
    detailedDescription: 'AZITION provides superior pharmacokinetic tissue affinity and prolonged 72-hour half-life against respiratory, skin, and genital tract bacterial infections.',
    keyInformation: [
      {
        title: 'Azithromycin 500 mg',
        description: 'Shows potent activity against Gram-positive bacteria including S. pneumoniae and Gram-negative organisms like H. influenzae. Superior tolerability profile compared to older macrolides.'
      }
    ],
    indications: [
      'Acute Bacterial Sinusitis',
      'Community-acquired Pneumonia',
      'Acute Bacterial Exacerbations of COPD',
      'Skin & Soft Tissue Infections',
      'Urethritis / Cervicitis'
    ],
    features: [
      'Kicks Out the Bacteria',
      'Convenient once-daily 3-day dosing schedule',
      'High intracellular tissue penetration'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'AZITION',
      nameColor: '#C8102E',
      genericFormula: 'Azithromycin 500 mg Tablets IP',
      headline: 'The hard hitting attack on Bacterial Infections...',
      tagline: 'Kicks Out the Bacteria',
      type: 'tablet',
      themeColor: '#C8102E',
      accentColor: '#EA580C',
      packingText: '10 x 3 Tablets',
      indications: ['Acute Bacterial Sinusitis', 'Community-acquired Pneumonia', 'COPD Exacerbations', 'Skin Infections', 'Urethritis / Cervicitis'],
      keyPoints: [
        {
          title: 'Azithromycin 500mg',
          points: [
            'Active against S. pneumoniae, H. influenzae & M. catarrhalis',
            'Useful in typhoid fever due to high tissue penetration',
            'Long elimination half-life of 72 hours'
          ]
        },
        {
          title: 'Clinical Efficacy',
          points: [
            'Superior pharmacokinetic & safety profile',
            'More effective than erythromycin in chlamydia cervicitis',
            'Once-daily convenience'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: true,
    order: 5
  },

  // 6. KOFTION-LS
  {
    id: 'prod-koftion-ls',
    slug: 'koftion-ls',
    name: 'KOFTION-LS™',
    genericName: 'Levosalbutamol 1 mg, Ambroxol 30 mg, Guaiphenesin 50 mg / 5 ml Syrup',
    composition: 'Levosalbutamol 1 mg, Ambroxol 30 mg, Guaiphenesin 50 mg / 5 ml Syrup (100 ml)',
    brandName: 'KOFTION-LS',
    category: 'Anti-Infectives',
    dosageForm: 'Syrup',
    packing: '100 ml Bottle with Measuring Cap',
    headline: 'Makes Life Easy with Easier Expectoration',
    shortDescription: 'Balanced triple mucokinetic, bronchodilator and expectorant syrup for asthmatic and productive bronchitis cough.',
    detailedDescription: 'KOFTION-LS combines pure Levosalbutamol for tremor-free bronchodilation, Ambroxol to liquefy thick mucus, and Guaiphenesin to soothe the bronchial tract.',
    keyInformation: [
      {
        title: 'Levosalbutamol',
        description: 'Produces relaxation of bronchial smooth muscles. Rapid action bronchodilator without tachycardia or hypocalcemia.'
      },
      {
        title: 'Ambroxol',
        description: 'Shows mucokinetic & secretolytic properties. Breaks mucus and ensures faster expulsion.'
      },
      {
        title: 'Guaiphenesin',
        description: 'Reduces the viscosity of tenacious secretion. Excellent expectorant action and soothes inflamed throat.'
      }
    ],
    indications: [
      'Asthma',
      'Chronic Obstructive Pulmonary Disease',
      'Productive Cough',
      'Asthmatic Cough & Bronchitis'
    ],
    features: [
      'Easy breathing all season',
      'Also available in KOFTION-LS Junior for pediatric care',
      'Rapid onset bronchodilation'
    ],
    alsoAvailable: [
      {
        name: 'KOFTION-LS junior',
        composition: 'Levosalbutamol 0.5 mg + Ambroxol 15 mg + Guaiphenesin 50 mg Syrup',
        dosageForm: 'Syrup'
      }
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'KOFTION-LS',
      nameColor: '#008080',
      genericFormula: 'Levosalbutamol 1 mg, Ambroxol 30 mg, Guaiphenesin 50 mg / 5 ml Syrup',
      headline: 'Makes Life Easy with Easier Expectoration',
      tagline: 'Easy breathing all season',
      type: 'syrup',
      themeColor: '#008080',
      accentColor: '#DC2626',
      alsoAvailable: 'KOFTION-LS junior',
      packingText: '100 ml Bottle',
      indications: ['Asthma', 'Chronic Obstructive', 'Productive Cough', 'Asthmatic Cough & Bronchitis'],
      keyPoints: [
        {
          title: 'Levosalbutamol',
          points: [
            'Relaxes bronchial smooth muscles',
            'Rapid action bronchodilator',
            'No side effects like tachycardia'
          ]
        },
        {
          title: 'Ambroxol',
          points: [
            'Time tested mucolytic agent',
            'Breaks thick mucus for faster expulsion',
            'Improves surfactant release'
          ]
        },
        {
          title: 'Guaiphenesin',
          points: [
            'Reduces viscosity of tenacious secretions',
            'Excellent expectorant action',
            'Soothes inflamed throat tissue'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: true,
    order: 6
  },

  // 7. ZIMTION-O
  {
    id: 'prod-zimtion-o',
    slug: 'zimtion-o',
    name: 'ZIMTION-O™',
    genericName: 'Cefixime 200 mg + Ofloxacin 200 mg Tablets',
    composition: 'Cefixime 200 mg + Ofloxacin 200 mg Tablets',
    brandName: 'ZIMTION-O',
    category: 'Anti-Infectives',
    dosageForm: 'Tablets',
    packing: '10 x 10 Tablets in Blister Pack',
    headline: 'Antibiotic with Deep Penetrating Efficacy...',
    shortDescription: 'Dual powerhouse alliance of 3rd generation cephalosporin and quinolone against resistant infections.',
    detailedDescription: 'ZIMTION-O delivers dual spectrum bactericidal synergy against typhoid, complex respiratory tract infections, and complicated urinary tract infections.',
    keyInformation: [
      {
        title: 'Cefixime 200 mg',
        description: '3rd Generation cephalosporin. Long acting (t 1/2 3hr) antibiotic. Highly active against Enterobacteriaceae, H.influenzae, strep. pyogenes & resistant to Beta-Lactamases.'
      },
      {
        title: 'Ofloxacin 200 mg',
        description: 'Effective Quinolone in Typhoid and complicated UTIs with high intracellular penetration.'
      }
    ],
    indications: [
      'Complicated Urinary Tract Infection',
      'Severe Respiratory Tract Infection',
      'Typhoid Fever',
      'SSTIs (Skin & Soft Tissue Infections)'
    ],
    features: [
      'A strong alliance against pathogens',
      'Beta-lactamase stable formulation',
      'Also available as ZIMTION Cefixime 200mg DT'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'ZIMTION-O',
      nameColor: '#2E7D32',
      genericFormula: 'Cefixime 200 mg + Ofloxacin 200 mg Tablets',
      headline: 'Antibiotic with Deep Penetrating Efficacy',
      tagline: 'A strong alliance against pathogens',
      type: 'tablet',
      themeColor: '#2E7D32',
      accentColor: '#16A34A',
      alsoAvailable: 'ZIMTION (Cefixime 200mg)',
      packingText: '10 x 10 Tablets',
      indications: ['Complicated UTI', 'Severe Respiratory Infection', 'Typhoid', 'SSTIs'],
      keyPoints: [
        {
          title: 'Cefixime',
          points: [
            '3rd Gen Cephalosporin with long half-life',
            'Highly active against Enterobacteriaceae',
            'Resistant to many Beta-Lactamases'
          ]
        },
        {
          title: 'Ofloxacin',
          points: [
            'Effective Quinolone in Typhoid and UTI',
            'Deep tissue penetration',
            'Rapid bactericidal action'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 7
  },

  // 8. LIFETION CV-625
  {
    id: 'prod-lifetion-cv-625',
    slug: 'lifetion-cv-625',
    name: 'LIFETION CV-625™',
    genericName: 'Amoxicillin 500 mg, Potassium Clavulanate 125 mg Tablets',
    composition: 'Amoxicillin 500 mg, Potassium Clavulanate 125 mg Tablets',
    brandName: 'LIFETION CV-625',
    category: 'Anti-Infectives',
    dosageForm: 'Tablets',
    packing: '1 x 10 Tablets in Alu-Alu Strip',
    headline: 'Be Tough on Resistant Pathogenic Bacteria with...',
    shortDescription: 'Gold standard beta-lactamase inhibitor combination maximizing clinical cure rates in serious infections.',
    detailedDescription: 'LIFETION CV-625 restores full amoxicillin potency against beta-lactamase producing organisms, demonstrating an 88.4% clinical cure rate across dental, respiratory, and surgical infections.',
    keyInformation: [
      {
        title: 'Amoxicillin + Clavulanate',
        description: 'Restores potency against beta-lactamase producing strains of H. influenzae and M. catarrhalis. Demonstrates 88.4% clinical cure rate in serious infections.'
      }
    ],
    indications: [
      'Upper & Lower RTIs',
      'Genito-Urinary Tract Infections',
      'Skin & Soft Tissue Infections',
      'Intra-Abdominal Infections',
      'Bone & Joint Infections',
      'Dental Infections'
    ],
    features: [
      'Maximizes Relief From Infections',
      '88.4% documented clinical cure rate',
      'Superior efficacy post dental extraction'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'LIFETION CV-625',
      nameColor: '#00796B',
      genericFormula: 'Amoxicillin 500 mg, Potassium Clavulanate 125 mg Tablets',
      headline: 'Be Tough on Resistant Pathogenic Bacteria with...',
      tagline: 'Maximizes Relief From Infections',
      type: 'tablet',
      themeColor: '#00796B',
      accentColor: '#DC2626',
      packingText: '1 x 10 Tablets',
      indications: ['Upper & Lower RTIs', 'Genito-Urinary Infections', 'Skin & Soft Tissue', 'Bone & Joint', 'Dental Infections'],
      keyPoints: [
        {
          title: 'Broad Spectrum',
          points: [
            'Active against S. pneumonia & beta-lactamase strains',
            'Restores amoxicillin antimicrobial potency',
            'Excellent tolerance & safety profile'
          ]
        },
        {
          title: 'Clinical Proven',
          points: [
            '88.4% clinical cure rate in bacterial infections',
            'Decreases infection risk after molar extraction',
            'First-line empiric choice'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 8
  },

  // 9. LIFETION-6G
  {
    id: 'prod-lifetion-6g',
    slug: 'lifetion-6g',
    name: 'LIFETION-6G™',
    genericName: 'Ginseng, Gingko biloba, Green tea, Garcinia, Ginger, Garlic Softgels',
    composition: 'Ginseng 21.25 mg, Gingko biloba, Green tea, Garcinia, Ginger, Garlic, Citrus, Lycopene, Amino Acids, Vitamins & Minerals Softgel Capsule',
    brandName: 'LIFETION-6G',
    category: 'Nutraceuticals',
    dosageForm: 'Capsules',
    packing: '1 x 10 Softgels in Blister',
    headline: 'Comprehensive Supplement of Vitamins & Minerals...',
    shortDescription: 'Premium 6G herbal antioxidant complex engineered to counter oxidative stress and restore vitality.',
    detailedDescription: 'LIFETION-6G combines 6 proven botanical extracts with essential micronutrients to protect vascular endothelium, improve fatty liver grades, and boost cellular stamina.',
    keyInformation: [
      {
        title: '6G Complex',
        description: 'Ginseng, Gingko, Green Tea, Garcinia, Ginger & Garlic synergistically prevent free radical tissue damage, lower cardiovascular risks, and counter cellular aging.'
      }
    ],
    indications: [
      'Cardiovascular Diseases',
      'Idiopathic male infertility',
      'Macular Degenerative diseases',
      'Diabetes Mellitus',
      'Prostate health',
      'General Fatigue'
    ],
    features: [
      'Restore the Rhythm of Life',
      'Contains 6 standardized herbal powerhouses',
      'Significantly improves fatty liver indices'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'LIFETION-6G',
      nameColor: '#990000',
      genericFormula: 'Ginseng, Gingko, Green tea, Garcinia, Ginger, Garlic Softgels',
      headline: 'Comprehensive Supplement of Vitamins & Minerals',
      tagline: 'Restore the Rhythm of Life',
      type: 'softgel',
      themeColor: '#990000',
      accentColor: '#65A30D',
      packingText: '1 x 10 Softgels',
      indications: ['Cardiovascular Diseases', 'Male Infertility', 'Macular Degeneration', 'Diabetes Mellitus', 'Fatigue'],
      keyPoints: [
        {
          title: 'Antioxidant Defense',
          points: [
            'Protects tissues and blood vessels from free radicals',
            'Prevents blood clots & lowers heart disease risk',
            'Improves grade of fatty liver changes'
          ]
        },
        {
          title: 'Cellular Vitality',
          points: [
            'Counters oxidative stress in circulatory system',
            'Antimicrobial & anti-inflammatory properties',
            'Enhances energy metabolism'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 9
  },

  // 10. LIFETION-ZYM
  {
    id: 'prod-lifetion-zym',
    slug: 'lifetion-zym',
    name: 'LIFETION-ZYM™',
    genericName: 'Fungal Diastase 50 mg, Pepsin 10 mg, Vitamin B-Complex Syrup & Drops',
    composition: 'Fungal Diastase 50 mg, Pepsin 10 mg, Vitamin B-Complex Syrup (200 ml) / Drops (30 ml)',
    brandName: 'LIFETION-ZYM',
    category: 'Gastroenterology',
    dosageForm: 'Syrup',
    packing: '200 ml Syrup (Pineapple Flavour) & 30 ml Drops (Mango Flavour)',
    headline: 'The Perfect Combination to complete digestion...',
    shortDescription: 'Digestive enzyme formula with carminative oils providing instant relief from dyspepsia and colic.',
    detailedDescription: 'LIFETION-ZYM harnesses potent starch and protein digestive enzymes to awaken lost appetite, eliminate heavy post-meal fullness, and give quick freedom from infantile colicky spasms.',
    keyInformation: [
      {
        title: 'Fungal Diastase & Pepsin',
        description: 'Aids complete gastrointestinal starch and protein breakdown. Corrects defective digestive enzyme secretion and rapidly revives lost appetite.'
      }
    ],
    indications: [
      'Indigestion',
      'Loss of Appetite',
      'Dyspepsia',
      'Abdominal Pain Due To Gastric Spasm',
      'Infantile Colic'
    ],
    features: [
      'Arouses Lost Hunger Instantly',
      'Delicious Pineapple (Syrup) & Mango (Drops) Flavours',
      'Prompt relief from spasmodic pain'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'LIFETION-ZYM',
      nameColor: '#1B5E20',
      genericFormula: 'Fungal Diastase 50 mg, Pepsin 10 mg, Vitamin B-Complex',
      headline: 'The Perfect Combination to complete digestion',
      tagline: 'Arouses Lost Hunger Instantly',
      type: 'syrup',
      themeColor: '#1B5E20',
      accentColor: '#CA8A04',
      packingText: '200 ml / 30 ml Drops',
      indications: ['Indigestion', 'Loss of Appetite', 'Dyspepsia', 'Gastric Spasm', 'Colicky Pain'],
      keyPoints: [
        {
          title: 'Fungal Diastase',
          points: [
            'Aids digestion in gastrointestinal tract',
            'Improves defective acid & enzyme secretion',
            'Regains lost appetite rapidly'
          ]
        },
        {
          title: 'Pepsin Power',
          points: [
            'Strong proteolytic digestive action',
            'Breaks complex food proteins completely',
            'Corrects chronic digestive disturbances'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 10
  },

  // 11. ACETION COLD
  {
    id: 'prod-acetion-cold',
    slug: 'acetion-cold',
    name: 'ACETION COLD™',
    genericName: 'Paracetamol 125 mg, Phenylephrine 5 mg, CPM 0.5 mg, Sodium Citrate 60 mg, Menthol 1 mg',
    composition: 'Paracetamol 125 mg + Phenylephrine HCl 5 mg + Chlorpheniramine Maleate 0.5 mg + Sodium Citrate 60 mg & Menthol 1 mg Syrup (60 ml)',
    brandName: 'ACETION COLD',
    category: 'General',
    dosageForm: 'Syrup',
    packing: '60 ml Suspension Bottle',
    headline: 'Triple action relief for cold & flu...',
    shortDescription: 'Multi-symptom cold suspension clearing nasal blockage, relieving fever, and soothing allergies.',
    detailedDescription: 'ACETION COLD provides rapid symptom control in acute pediatric viral coryza, blocking histamine sneezing, breaking fever, and unblocking the upper airway with refreshing menthol.',
    keyInformation: [
      {
        title: 'Multi-Action Formula',
        description: 'Combines fever-reducing paracetamol with decongesting phenylephrine and antihistaminic chlorpheniramine maleate.'
      }
    ],
    indications: [
      'Common Cold',
      'Allergic Rhinitis',
      'Sneezing & Nasal Congestion',
      'Runny or Blocked Nose',
      'Fever & Headache'
    ],
    features: [
      'Fights Fever, Frees the Nose, Calms Allergies',
      'Gentle pediatric formulation',
      'Soothing menthol touch'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'ACETION COLD',
      nameColor: '#E65100',
      genericFormula: 'Paracetamol 125 mg + Phenylephrine 5 mg + CPM 0.5 mg Syrup',
      headline: 'Triple action relief for cold & flu',
      tagline: 'Fights Fever, Frees the Nose, Calms Allergies',
      type: 'syrup',
      themeColor: '#E65100',
      accentColor: '#DC2626',
      packingText: '60 ml Suspension',
      indications: ['Common Cold', 'Allergic Rhinitis', 'Sneezing', 'Runny / Blocked Nose', 'Fever'],
      keyPoints: [
        {
          title: 'Fever & Pain',
          points: [
            'Paracetamol brings down high temperatures',
            'Elevates pain threshold safely',
            'Fast relief from body aches'
          ]
        },
        {
          title: 'Nasal Freedom',
          points: [
            'Phenylephrine unblocks congested passages',
            'CPM stops histamine watery discharge',
            'Menthol provides easy airway airflow'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 11
  },

  // 12. LIFETION (Appetite Stimulant)
  {
    id: 'prod-lifetion-appetite',
    slug: 'lifetion-appetite',
    name: 'LIFETION™',
    genericName: 'Cyproheptadine HCl 2 mg + Tricholine Citrate 275 mg + Sorbitol 70%',
    composition: 'Cyproheptadine Hydrochloride 2 mg + Tricholine Citrate 275 mg + Sorbitol Solution 70% Syrup / Drops',
    brandName: 'LIFETION',
    category: 'General',
    dosageForm: 'Syrup',
    packing: '100 ml Syrup & 30 ml Drops',
    headline: 'Enhance Appetite & Growth with LIFETION...',
    shortDescription: 'USFDA-approved appetite stimulant and hepatoprotective tonic for sluggish growth and anorexia.',
    detailedDescription: 'LIFETION stimulates the hypothalamic feeding center, mobilizes liver fat accumulation through tricholine citrate, and ensures healthy weight gain in growing children and convalescing adults.',
    keyInformation: [
      {
        title: 'Cyproheptadine & Tricholine',
        description: 'USFDA-approved appetite stimulant recommended for anorexia. Stimulates pancreatic secretions and depletes liver fat accumulation.'
      }
    ],
    indications: [
      'Intestinal malabsorption',
      'Anorexia & Poor Appetite',
      'Sluggish peristalsis',
      'Growth Faltering'
    ],
    features: [
      'Absolute Solution for Suppressed Appetite',
      'Available in both pediatric Drops and Syrup',
      'Relieves functional constipation'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'LIFETION',
      nameColor: '#F57F17',
      genericFormula: 'Cyproheptadine HCl 2 mg + Tricholine Citrate 275 mg Syrup',
      headline: 'Enhance Appetite & Growth with LIFETION',
      tagline: 'Absolute Solution for Suppressed Appetite',
      type: 'syrup',
      themeColor: '#F57F17',
      accentColor: '#0D47A1',
      packingText: '100 ml Syrup / 30 ml Drops',
      indications: ['Intestinal Malabsorption', 'Anorexia', 'Sluggish Peristalsis', 'Indigestion'],
      keyPoints: [
        {
          title: 'Appetite Stimulant',
          points: [
            'USFDA approved appetite stimulant',
            'Recommended for pediatric and adult anorexia',
            'Stimulates desire for nutritious food'
          ]
        },
        {
          title: 'Liver & Digestion',
          points: [
            'Tricholine promotes pancreatic secretions',
            'Depletes excess fat accumulation in liver',
            'Sorbitol ensures smooth bowel clearance'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 12
  },

  // 13. KOFTION JUNIOR
  {
    id: 'prod-koftion-junior',
    slug: 'koftion-junior',
    name: 'KOFTION JUNIOR™',
    genericName: 'Ambroxol 15 mg, Guaiphenesin 50 mg, Terbutaline 1.25 mg / 5 ml Syrup',
    composition: 'Ambroxol 15 mg, Guaiphenesin 50 mg, Terbutaline 1.25 mg / 5 ml Syrup (100 ml)',
    brandName: 'KOFTION JUNIOR',
    category: 'Anti-Infectives',
    dosageForm: 'Syrup',
    packing: '100 ml Pediatric Syrup Bottle',
    headline: 'Provides Breath Freely to Your Kids...',
    shortDescription: 'Pediatric mucolytic bronchodilator for rapid relief from asthmatic cough and bronchitis in children.',
    detailedDescription: 'KOFTION JUNIOR is specially calibrated for children, relaxing constricted airways with Terbutaline and clearing bronchial mucus effortlessly.',
    keyInformation: [
      {
        title: 'Ambroxol + Terbutaline',
        description: 'Promotes mucus clearance and relieves bronchial constriction safely in pediatric respiratory conditions.'
      }
    ],
    indications: [
      'Asthmatic Cough in Children',
      'Bronchitis',
      'Productive Cough',
      'Smoker\'s Cough'
    ],
    features: [
      'Rests coughing.... Speeds recovery',
      'Kid-friendly taste profile',
      'Short-term asthma relief'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'KOFTION JUNIOR',
      nameColor: '#1B5E20',
      genericFormula: 'Ambroxol 15 mg, Guaiphenesin 50 mg, Terbutaline 1.25 mg / 5 ml',
      headline: 'Provides Breath Freely to Your Kids',
      tagline: 'Rests coughing.... Speeds recovery',
      type: 'syrup',
      themeColor: '#1B5E20',
      accentColor: '#16A34A',
      packingText: '100 ml Syrup',
      indications: ['Asthmatic Cough', 'Productive Cough', 'Bronchitis', 'Smoker\'s Cough'],
      keyPoints: [
        {
          title: 'Airway Relief',
          points: [
            'Terbutaline relaxes bronchial smooth muscles',
            'Rapid relief from wheezing and tightness',
            'Pediatric dosage precision'
          ]
        },
        {
          title: 'Mucus Clearance',
          points: [
            'Ambroxol liquefies stubborn secretions',
            'Guaiphenesin facilitates gentle expectoration',
            'Allows kids restful, uninterrupted sleep'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 13
  },

  // 14. RELATION-XP (Injection)
  {
    id: 'prod-relation-xp',
    slug: 'relation-xp',
    name: 'RELATION-XP™',
    genericName: 'Ceftriaxone 1000 mg + Tazobactam 125 mg Injection',
    composition: 'Ceftriaxone 1000 mg + Tazobactam 125 mg Injection',
    brandName: 'RELATION-XP',
    category: 'Anti-Infectives',
    dosageForm: 'Injection',
    packing: '1.125 gm Vial with Sterile Water for Injection',
    headline: 'A safeguard against infections...',
    shortDescription: 'High-potency injectable beta-lactamase inhibitor combination for serious hospital and surgical infections.',
    detailedDescription: 'RELATION-XP combines broad-spectrum Ceftriaxone with irreversible beta-lactamase inhibitor Tazobactam to eliminate resistant pathogens in septicemia, meningitis, and pre-surgical prophylaxis.',
    keyInformation: [
      {
        title: 'Ceftriaxone & Tazobactam',
        description: 'High degree of stability against beta-lactamases produced by both Gram +ve and Gram -ve microbes. Superior in preventing postoperative surgical site infections.'
      }
    ],
    indications: [
      'Surgical Prophylaxis',
      'Septicaemia',
      'Nosocomial Hospital Infections',
      'Bone & Joint Infections',
      'Meningitis'
    ],
    features: [
      'Powerful Stroke against typical Target....',
      'Includes sterile water for reconstitution',
      'High tissue concentration'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'RELATION-XP',
      nameColor: '#B71C1C',
      genericFormula: 'Ceftriaxone 1000 mg + Tazobactam 125 mg Injection',
      headline: 'A safeguard against infections',
      tagline: 'Powerful Stroke against typical Target....',
      type: 'injection',
      themeColor: '#B71C1C',
      accentColor: '#D97706',
      packingText: '1.125 gm Vial',
      indications: ['Surgical Prophylaxis', 'Septicaemia', 'Nosocomial Infections', 'Bone & Joint', 'Meningitis'],
      keyPoints: [
        {
          title: 'Ceftriaxone',
          points: [
            'Broad spectrum 3rd gen cephalosporin',
            'Superior post-operative infection prevention',
            'High bactericidal concentration'
          ]
        },
        {
          title: 'Tazobactam',
          points: [
            'Penicillanic acid sulfone beta-lactamase inhibitor',
            'Restores full Ceftriaxone potency',
            'Neutralizes resistant enzymes'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 14
  },

  // 15. ACETION-AQ (Injection)
  {
    id: 'prod-acetion-aq',
    slug: 'acetion-aq',
    name: 'ACETION-AQ™',
    genericName: 'Diclofenac Sodium 75 mg / 1 ml Injection',
    composition: 'Diclofenac Sodium 75 mg / 1 ml Injection',
    brandName: 'ACETION-AQ',
    category: 'Pain Management',
    dosageForm: 'Injection',
    packing: '10 x 1 ml Ampoules Pack',
    headline: 'Turn Sadness of Pain Into Joy of Relief...',
    shortDescription: 'High-concentration aqueous Diclofenac injection for prompt relief from severe acute pain and postoperative trauma.',
    detailedDescription: 'ACETION-AQ provides immediate analgesic onset for acute musculoskeletal trauma, fractures, biliary/renal colic, and severe post-operative surgical pain.',
    keyInformation: [
      {
        title: 'Diclofenac Sodium 75mg/ml',
        description: 'Eliminates all types of severe pain and inflammatory conditions with rapid antipyretic action. Relieves pain, tenderness, swelling, and stiffness.'
      }
    ],
    indications: [
      'Pain & Inflammation',
      'Dislocations and Fractures',
      'Musculoskeletal Disorders',
      'Osteoarthritis flare-ups',
      'Post-operative surgical pain'
    ],
    features: [
      'Freedom from the Strains of Pain',
      'Aqueous 1 ml painless injection technology',
      'Rapid onset analgesia'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'ACETION-AQ',
      nameColor: '#B71C1C',
      genericFormula: 'Diclofenac Sodium 75 mg / 1 ml Injection',
      headline: 'Turn Sadness of Pain Into Joy of Relief',
      tagline: 'Freedom from the Strains of Pain',
      type: 'injection',
      themeColor: '#B71C1C',
      accentColor: '#CA8A04',
      packingText: '10 x 1 ml Ampoules',
      indications: ['Pain & Inflammation', 'Dislocations and fractures', 'Musculoskeletal disorders', 'Osteoarthritis'],
      keyPoints: [
        {
          title: 'Acute Analgesia',
          points: [
            'Eliminates severe inflammatory pain fast',
            'Antipyretic efficacy for high fevers',
            'Immediate systemic absorption'
          ]
        },
        {
          title: 'Targeted Relief',
          points: [
            'Eases pain associated with trauma & fractures',
            'Controls osteoarthritis tenderness & stiffness',
            'Well-tolerated aqueous solution'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 15
  },

  // 16. LIFETION-VIT
  {
    id: 'prod-lifetion-vit',
    slug: 'lifetion-vit',
    name: 'LIFETION-VIT™',
    genericName: 'Multivitamin, Mineral, Antioxidants, L-Lysin 375 mg, Sorbitol 70 mg Syrup',
    composition: 'Multivitamin, Mineral, Antioxidants, L-Lysin 375 mg, Sorbitol 70 mg Syrup (200 ml)',
    brandName: 'LIFETION-VIT',
    category: 'Nutraceuticals',
    dosageForm: 'Syrup',
    packing: '200 ml Bottle (Mix Fruits Flavour)',
    headline: 'A complete package of Vital Nutrients...',
    shortDescription: 'Complete multivitamin and antioxidant tonic in delicious Mix Fruits flavour for stamina and immune support.',
    detailedDescription: 'LIFETION-VIT neutralizes free radicals, boosts tissue regeneration with L-Lysine, and supports faster recovery during post-viral convalescence and chronic fatigue.',
    keyInformation: [
      {
        title: 'Vitamins & L-Lysine',
        description: 'Neutralizes oxygen free radicals. Exerts positive effects on growth, energy & appetite. Supports protective activity of immune cells through antibody production.'
      }
    ],
    indications: [
      'Oxidative Stress',
      'Low Immunity',
      'General Weakness & Fatigue',
      'Convalescence after Illness'
    ],
    features: [
      'Mix Fruits Flavour',
      'Overcomes malnutrition and dietary gaps',
      'Essential for growing teens and busy professionals'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'LIFETION-VIT',
      nameColor: '#1B5E20',
      genericFormula: 'Multivitamin, Minerals, Antioxidants, L-Lysin 375 mg Syrup',
      headline: 'A complete package of Vital Nutrients...',
      tagline: 'Mix Fruits Flavour',
      type: 'syrup',
      themeColor: '#1B5E20',
      accentColor: '#DC2626',
      packingText: '200 ml Bottle',
      indications: ['Oxidative Stress', 'Low Immunity', 'Weakness', 'Convalescence'],
      keyPoints: [
        {
          title: 'Immune Support',
          points: [
            'Neutralizes free radicals & oxidative damage',
            'Supports immune antibody production',
            'Boosts daily stamina and physical energy'
          ]
        },
        {
          title: 'Growth & Appetite',
          points: [
            'L-Lysin promotes structural tissue growth',
            'Revitalizes sluggish metabolic function',
            'Delicious mix fruits palate appeal'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 16
  },

  // 17. ACETION-RB
  {
    id: 'prod-acetion-rb',
    slug: 'acetion-rb',
    name: 'ACETION-RB™',
    genericName: 'Rabeprazole Sodium 20 mg (EC) + Aceclofenac 200 mg (SR) Capsule',
    composition: 'Rabeprazole Sodium 20 mg (EC) + Aceclofenac 200 mg (SR) Capsule',
    brandName: 'ACETION-RB',
    category: 'Pain Management',
    dosageForm: 'Capsules',
    packing: '1 x 10 Capsules in Blister Strip',
    headline: 'Get back the FLEXIBILITY without trouble with...',
    shortDescription: 'Dual enteric-coated proton pump inhibitor with sustained-release NSAID offering round-the-clock pain relief with complete gastric safety.',
    detailedDescription: 'ACETION-RB solves NSAID-induced gastric hyperacidity by coupling 24-hour sustained-release Aceclofenac with protective Rabeprazole.',
    keyInformation: [
      {
        title: 'Rabeprazole + Aceclofenac',
        description: 'Potent inhibitor of gastric acid secretion providing OD dose convenience, while selective COX-2 Aceclofenac ensures sustained pain relief with zero gastritis.'
      }
    ],
    indications: [
      'Fever & Body Aches with Acidity',
      'ENT Inflammation',
      'Dental Pain',
      'Post-Operative Pain',
      'Osteoarthritis'
    ],
    features: [
      'No Gas No Pain',
      'Once-daily dosing convenience',
      'Restores joint flexibility without gastric distress'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'ACETION-RB',
      nameColor: '#8B152B',
      genericFormula: 'Rabeprazole Sodium 20 mg (EC) + Aceclofenac 200 mg (SR) Capsule',
      headline: 'Get back the FLEXIBILITY without trouble with...',
      tagline: 'No Gas No Pain',
      type: 'capsule',
      themeColor: '#8B152B',
      accentColor: '#EA580C',
      packingText: '1 x 10 Capsules',
      indications: ['Fever & Body Aches', 'ENT Inflammation', 'Dental Pain', 'Post-Operative Pain', 'Osteoarthritis'],
      keyPoints: [
        {
          title: 'Rabeprazole EC',
          points: [
            'Potent inhibitor of gastric acid secretion',
            'Prevents NSAID-induced mucosal damage',
            'Ensures OD dose convenience'
          ]
        },
        {
          title: 'Aceclofenac SR',
          points: [
            'Sustained pain relief all day long',
            'Superior to conventional Diclofenac',
            'Selective COX-2 anti-inflammatory action'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 17
  },

  // 18. BANKCAL
  {
    id: 'prod-bankcal',
    slug: 'bankcal',
    name: 'BANKCAL™',
    genericName: 'Calcium Carbonate 1250 mg + Pyridoxal-5-Phosphate + D3 2000 IU + L-Methylfolate + Methylcobalamin',
    composition: 'Calcium Carbonate 1250 mg (eq. to Elemental Calcium 500 mg) + Pyridoxal-5-Phosphate 20 mg + Vitamin D3 2000 IU + L-Methylfolate Calcium 1 mg + Methylcobalamin 1500 mcg',
    brandName: 'BANKCAL',
    category: 'Nutraceuticals',
    dosageForm: 'Tablets',
    packing: '10 x 10 Tablets in Blister Pack',
    headline: 'Maintain Strong Bones...',
    shortDescription: 'Comprehensive bone mineralizer with bioactive Vitamin D3, Methylcobalamin, and active folate.',
    detailedDescription: 'BANKCAL defends bone structural density against osteoporotic fractures while supporting peripheral neuropathic nerve conduction and RBC synthesis.',
    keyInformation: [
      {
        title: 'Bone & Neuro Matrix',
        description: 'High elemental calcium fortified with 2000 IU Vitamin D3 for bone mineralization, combined with Methylcobalamin and L-Methylfolate for nerve sheath repair and prevention of neuropathic joint pain.'
      }
    ],
    indications: [
      'Reduces Risk of Osteoporosis',
      'Helps Maintain Body Strength',
      'Severe Muscular & Joint Pain',
      'Neuropathic Pain & Sciatica',
      'Nutritional Deficiencies & Anaemia'
    ],
    features: [
      'Best Calcium with Best Results',
      'High strength 2000 IU Vitamin D3 inclusion',
      'Targeted for severe bone and neuropathic pain'
    ],
    primaryImage: generateAuthenticProductCardSvg({
      name: 'BANKCAL',
      nameColor: '#0277BD',
      genericFormula: 'Calcium Carbonate 1250 mg + D3 2000 IU + Methylcobalamin + L-Methylfolate',
      headline: 'Maintain Strong Bones',
      tagline: 'Best Calcium with Best Results',
      type: 'tablet',
      themeColor: '#0277BD',
      accentColor: '#0284C7',
      packingText: '10 x 10 Tablets',
      indications: ['Osteoporosis Risk', 'Maintain Body Strength', 'Muscular & Joint Pain', 'Neuropathic Pain', 'Nutritional Anaemia'],
      keyPoints: [
        {
          title: 'Bone Matrix',
          points: [
            'Vitamin D3 ensures bone calcium absorption',
            'Elemental Calcium 500 mg maintains bone density',
            'Prevents osteoporotic fractures'
          ]
        },
        {
          title: 'Neuro & Blood',
          points: [
            'Methylcobalamin repairs damaged nerve sheaths',
            'L-Methylfolate prevents low folate anemia',
            'Pyridoxal-5-phosphate supports neurotransmitters'
          ]
        }
      ]
    }),
    galleryImages: [],
    published: true,
    featured: false,
    order: 18
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-award-jharkhand',
    title: 'Best Health Medicine Company of Jharkhand',
    description: 'Prestigious Global Award presented to Relation Healthcare Care Since 2016 (Marketing Manager Mr. Thakur Prasad Mahto).',
    category: 'Company',
    imageUrl: generateAwardMementoSvg(),
    date: '2026-01-15',
    featured: true,
    published: true,
    order: 1
  },
  {
    id: 'gal-acetion-sp',
    title: 'ACETION-SP™ Official Visual Aid & Blister',
    description: 'Official clinical detailing artwork and 10x10 blister foil presentation for ACETION-SP Triple Action tablets.',
    category: 'Products',
    imageUrl: generateAuthenticProductCardSvg({
      name: 'ACETION-SP',
      nameColor: '#1E295D',
      genericFormula: 'Aceclofenac 100 mg, Paracetamol 325 mg, Serratiopeptidase 15 mg Tablets',
      headline: 'Ensure Relief Pain and Inflammation with Triple Action',
      tagline: 'Ends inflammation & pain with Perfection',
      type: 'tablet',
      themeColor: '#1E295D',
      accentColor: '#D8232A',
      alsoAvailable: 'ACETION-P',
      packingText: '10 x 10 Tablets',
      indications: ['Pain & Inflammation', 'Back Pain', 'Neck/Shoulder Pain', 'Sprains strains', 'Tendonitis / Bursitis'],
      keyPoints: [
        {
          title: 'Triple Action',
          points: ['Aceclofenac 100mg inhibits PGE-2', 'Paracetamol 325mg pain relief', 'Serratiopeptidase 15mg reduces 50% swelling']
        }
      ]
    }),
    date: '2026-02-15',
    featured: true,
    published: true,
    order: 2
  },
  {
    id: 'gal-gastion',
    title: 'GASTION™ Gastro Protection Series',
    description: 'Sustained release formulation presentation for hyperacidity and GERD: GASTION & GASTION-20.',
    category: 'Products',
    imageUrl: generateAuthenticProductCardSvg({
      name: 'GASTION',
      nameColor: '#581845',
      genericFormula: 'Rabeprazole Sodium 20 mg, Domperidone 30 mg (SR) Capsule',
      headline: 'Provide Protection from Raining Acid in Stomach',
      tagline: 'Dual Action for Round the Clock Relief',
      type: 'capsule',
      themeColor: '#581845',
      accentColor: '#B71C1C',
      alsoAvailable: 'GASTION-20',
      packingText: '10 x 10 Capsules',
      indications: ['Gastritis', 'Peptic Ulcers', 'Hyperacidity', 'GERD'],
      keyPoints: [
        {
          title: 'Dual Relief',
          points: ['Rabeprazole fastest acid suppression', 'Domperidone increases LES pressure & motility']
        }
      ]
    }),
    date: '2026-02-20',
    featured: true,
    published: true,
    order: 3
  },
  {
    id: 'gal-bankcal',
    title: 'BANKCAL™ Advanced Bone & Joint Matrix',
    description: 'Complete calcium formulation with active Vitamin D3 2000 IU, Methylcobalamin, and L-Methylfolate.',
    category: 'Products',
    imageUrl: generateAuthenticProductCardSvg({
      name: 'BANKCAL',
      nameColor: '#0277BD',
      genericFormula: 'Calcium Carbonate 1250 mg + D3 2000 IU + Methylcobalamin',
      headline: 'Maintain Strong Bones',
      tagline: 'Best Calcium with Best Results',
      type: 'tablet',
      themeColor: '#0277BD',
      accentColor: '#0284C7',
      packingText: '10 x 10 Tablets',
      indications: ['Osteoporosis', 'Maintain Strength', 'Severe Joint Pain'],
      keyPoints: [{ title: 'Bone Health', points: ['High elemental calcium', 'Fortified with 2000 IU D3'] }]
    }),
    date: '2026-03-01',
    featured: true,
    published: true,
    order: 4
  },
  {
    id: 'gal-qc-lab',
    title: 'Analytical Quality Control Testing Laboratory',
    description: 'Analytical evaluation and dissolution testing procedures in compliance with pharmacopeial standards.',
    category: 'Medical / Healthcare',
    imageUrl: generateFacilitySvg('Analytical Quality Control Laboratory'),
    date: '2026-01-10',
    featured: true,
    published: true,
    order: 5
  },
  {
    id: 'gal-cold-chain',
    title: 'Pharmaceutical Cold Chain Logistics',
    description: 'Temperature-monitored warehouse and secure distribution protocols for healthcare products.',
    category: 'Company',
    imageUrl: generateFacilitySvg('Pharmaceutical Distribution Center'),
    date: '2026-01-18',
    featured: false,
    published: true,
    order: 6
  }
];

export const initialEmployees: User[] = [
  {
    id: 'user-admin',
    name: 'Admin Relation Healthcare',
    email: 'relationhealthcare@gmail.com',
    role: 'admin',
    employeeId: 'ADM-001',
    designation: 'Managing Director & Administrator',
    phone: '+91 70422 3942',
    territory: 'Head Office',
    status: 'active',
    joinedDate: '2025-01-01'
  },
  {
    id: 'user-thakur-prasad',
    name: 'Mr. Thakur Prasad Mahto',
    email: 'thakur.mahto@relationhealthcare.com',
    role: 'manager',
    employeeId: 'RH-MGR-001',
    designation: 'Marketing Manager (Since 2016)',
    phone: '+91 70422 3942',
    territory: 'Jharkhand & Eastern Region',
    status: 'active',
    joinedDate: '2016-04-01'
  },
  {
    id: 'user-mr-rahul',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@relationhealthcare.com',
    role: 'medical_rep',
    employeeId: 'RH-MR-101',
    designation: 'Senior Medical Representative',
    phone: '+91 98110 54321',
    territory: 'North Delhi & NCR Zone',
    status: 'active',
    joinedDate: '2025-06-15'
  },
  {
    id: 'user-se-priya',
    name: 'Priya Patel',
    email: 'priya.patel@relationhealthcare.com',
    role: 'sales_exec',
    employeeId: 'RH-SE-204',
    designation: 'Key Accounts Sales Executive',
    phone: '+91 98220 65432',
    territory: 'South Mumbai & Pune',
    status: 'active',
    joinedDate: '2025-08-01'
  }
];

export const initialReports: EmployeeReport[] = [
  {
    id: 'rep-001',
    employeeId: 'RH-MR-101',
    employeeName: 'Rahul Sharma',
    designation: 'Senior Medical Representative',
    reportType: 'daily',
    reportDate: '2026-10-02',
    location: 'Rohini Sector 14, Delhi',
    doctorCustomerName: 'Dr. A. K. Mathur',
    specialty: 'Orthopedic Surgeon',
    hospitalClinic: 'Lifeline Bone & Joint Clinic',
    numberOfVisits: 1,
    productsDiscussed: ['ACETION-SP™', 'ACETION-P', 'BANKCAL™'],
    orderEnquiryDetails: 'Doctor requested 30 boxes of ACETION-SP for clinic pharmacy stock.',
    orderValueEstimated: 12500,
    followUpDate: '2026-10-15',
    remarks: 'Doctor appreciated the Serratiopeptidase 15mg strength for rapid post-sprain edema resolution.',
    status: 'approved',
    adminNotes: 'High potential prescriber, ensure timely sample delivery.',
    createdAt: '2026-10-02T16:30:00Z'
  },
  {
    id: 'rep-002',
    employeeId: 'RH-MR-101',
    employeeName: 'Rahul Sharma',
    designation: 'Senior Medical Representative',
    reportType: 'daily',
    reportDate: '2026-10-03',
    location: 'Pitampura Commercial Complex, Delhi',
    doctorCustomerName: 'Dr. Sunita Bansal',
    specialty: 'Consultant Gastroenterologist',
    hospitalClinic: 'Digestive Wellness Center',
    numberOfVisits: 2,
    productsDiscussed: ['GASTION™', 'LIFETION-ZYM™'],
    orderEnquiryDetails: 'Showed interest in sustained-release Domperidone formulation for persistent GERD patients.',
    orderValueEstimated: 8400,
    followUpDate: '2026-10-18',
    remarks: 'Sample pack of GASTION handed over. Follow-up booked for next week.',
    status: 'submitted',
    createdAt: '2026-10-03T11:15:00Z'
  },
  {
    id: 'rep-003',
    employeeId: 'RH-MGR-001',
    employeeName: 'Mr. Thakur Prasad Mahto',
    designation: 'Marketing Manager',
    reportType: 'weekly',
    reportDate: '2026-10-01',
    location: 'Ranchi & Dhanbad Medical Hub',
    doctorCustomerName: 'Jharkhand Orthopedic Association Members',
    specialty: 'Orthopedic Specialists',
    hospitalClinic: 'Central Hospital Hub',
    numberOfVisits: 8,
    productsDiscussed: ['ACETION-SP™', 'BANKCAL™', 'ACETION-AQ™', 'RELATION-XP™'],
    orderEnquiryDetails: 'Quarterly institutional supply tender discussed for ACETION-SP & RELATION-XP.',
    orderValueEstimated: 240000,
    followUpDate: '2026-10-25',
    remarks: 'Strong brand loyalty established across Jharkhand medical institutions.',
    status: 'approved',
    createdAt: '2026-10-01T18:45:00Z'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-001',
    name: 'Dr. Vikram Malhotra',
    email: 'dr.malhotra@fortisortho.in',
    mobile: '+91 98450 12345',
    city: 'Bengaluru',
    subject: 'Bulk clinic supply enquiry for ACETION-SP',
    productInterestedIn: 'ACETION-SP™',
    message: 'We are looking to introduce ACETION-SP across our outpatient musculoskeletal department. Please provide institutional commercial terms and certified product literature.',
    status: 'in_progress',
    createdAt: '2026-10-02T09:14:00Z',
    notes: 'Sent pricing slab on WhatsApp, follow-up call scheduled.'
  },
  {
    id: 'enq-002',
    name: 'Suresh Singhania',
    email: 'suresh@ommedicos.com',
    mobile: '+91 97123 45678',
    city: 'Jaipur',
    subject: 'Distributorship enquiry for Rajasthan territory',
    productInterestedIn: 'GASTION™',
    message: 'Interested in becoming authorized stockist for Relation Healthcare products in Jaipur and adjacent districts.',
    status: 'new',
    createdAt: '2026-10-03T01:45:00Z'
  }
];

export const initialHomepageContent: HomepageContent = {
  headline: 'Quality Healthcare. Trusted Relationships.',
  subheadline: 'Relation Healthcare is committed to providing quality healthcare products with a focus on reliability, innovation and professional service.',
  heroImage: generateHeroBannerSvg(),
  featuredProductIds: ['prod-action-sp', 'prod-gastion', 'prod-bankcal', 'prod-lifetion-xt'],
  companyIntroTitle: 'Dedicated to Medical Excellence & Reliable Care',
  companyIntroText: 'At Relation Healthcare (Since 2016), we bridge the gap between advanced pharmaceutical science and everyday patient care. Our focus is centered on therapeutic precision, stringent manufacturing standards, and steadfast partnerships with medical practitioners across India.',
  commitments: [
    {
      title: 'Rigorous Quality Standards',
      description: 'Every batch is formulated under verified pharmaceutical good manufacturing practices ensuring optimal bioavailability and safety.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Patient-First Formulations',
      description: 'Therapeutically balanced compositions like ACTION-SP™ and GASTION™ tailored to provide targeted relief without compromise.',
      icon: 'HeartHandshake'
    },
    {
      title: 'Dependable Healthcare Partnerships',
      description: 'Cultivating enduring relationships with doctors, pharmacists, and medical distributors built on trust and timely support.',
      icon: 'Handshake'
    }
  ],
  whyChooseUs: [
    {
      title: 'Scientific Therapeutic Formulations',
      description: 'Products engineered with synergistically active ingredients that deliver consistent clinical outcomes.'
    },
    {
      title: 'Uncompromising Packaging Integrity',
      description: 'Premium Alu-Alu and moisture-resistant blister packaging to preserve formulation potency in all environmental conditions.'
    },
    {
      title: 'Responsive Healthcare Support',
      description: 'Dedicated professional team providing verified medical information, seamless field reporting, and responsive service.'
    },
    {
      title: 'Ethical Pharmaceutical Practice',
      description: 'Awarded Best Health Medicine Company of Jharkhand with proven excellence since 2016.'
    }
  ],
  ctaPrimaryText: 'Explore Products',
  ctaSecondaryText: 'Contact Us'
};

export const initialAboutContent: AboutContent = {
  title: 'About Relation Healthcare',
  whoWeAre: 'Relation Healthcare is an established pharmaceutical enterprise founded in 2016 with a clear mandate: to deliver dependable, high-standard healthcare formulations that physicians trust and patients rely on. Honored with the prestigious Global Award as "Best Health Medicine Company of Jharkhand", our operations encompass precision product development, stringent quality evaluation, and professional medical distribution.',
  mission: 'To enhance quality of life by delivering therapeutically superior, ethically marketed pharmaceutical formulations through reliable partnerships across the healthcare ecosystem.',
  vision: 'To emerge as one of India\'s most trusted healthcare brands, recognized for therapeutic efficacy, transparent business ethics, and enduring professional relationships.',
  values: [
    {
      title: 'Integrity & Ethics',
      description: 'We hold ourselves to the highest standards of pharmaceutical governance, regulatory adherence, and honesty in all interactions.'
    },
    {
      title: 'Patient Care & Empathy',
      description: 'Every product in our portfolio is designed with the patient\'s clinical relief as our paramount priority.'
    },
    {
      title: 'Reliability & Consistency',
      description: 'Delivering consistent batch-to-batch quality, stable supply logistics, and dependable professional service.'
    },
    {
      title: 'Collaborative Partnerships',
      description: 'Believing that enduring relationships with healthcare professionals and distribution partners form the backbone of true healthcare progress.'
    }
  ],
  qualityCommitment: 'Relation Healthcare adheres to rigorous quality control measures across the product lifecycle. From formulation stability testing and raw ingredient verification to tamper-proof finished packaging, we ensure that every unit reaching a patient meets defined pharmacopeial standards.',
  professionalApproach: 'Our dedicated field representatives operate with scientific knowledge, ethical conduct, and respect for medical professionals\' time. Through structured reporting and open feedback channels, we continuously refine our service to meet doctors\' clinical requirements.'
};

export const initialSettings: WebsiteSettings = {
  companyName: 'RELATION HEALTHCARE',
  logoUrl: '/rhc-logo.svg',
  email: 'relationhealthcare@gmail.com',
  whatsappNumber: '+91 70422 3942',
  whatsappMessage: 'Hello Relation Healthcare, I would like to know more about your products.',
  phoneNumber: '+91 70422 3942',
  address: 'Relation Healthcare Corporate Office, New Delhi - 110034, India',
  googleMapsUrl: 'https://maps.google.com/?q=New+Delhi,+India',
  facebookUrl: 'https://facebook.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://twitter.com',
  footerTagline: 'Quality Healthcare. Trusted Relationships.',
  announcementText: 'Welcome to Relation Healthcare (Care Since 2016). View our authentic products ACTION-SP™, GASTION™, BANKCAL™ and more.',
  announcementActive: true,
  seoTitle: 'Relation Healthcare — Quality Healthcare. Trusted Relationships.',
  seoDescription: 'Relation Healthcare provides quality pharmaceutical products including ACTION-SP, GASTION, BANKCAL, and LIFETION with clinical reliability and professional care.',
  seoKeywords: 'Relation Healthcare, ACTION-SP, GASTION, BANKCAL, LIFETION, pharmaceutical company, Aceclofenac, Paracetamol, Serratiopeptidase, Rabeprazole, Domperidone'
};
