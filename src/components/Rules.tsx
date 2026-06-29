'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Users, Sword, Heart, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Gavel, Ban } from 'lucide-react';

const Rules = () => {
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const rules = [
    {
      id: 'nap-requirements',
      title: 'NAP Requirements',
      icon: Shield,
      color: '#00f0ff',
      summary: 'Requirements to enter and maintain NAP3 membership.',
      details: [
        'Must reach at least 5th position in alliance ranking during the last SVS',
        'Respect: All members are expected to act with respect, fostering a friendly and collaborative gaming environment',
        'Cooperation: Alliances that are part of NAP will work together to achieve victory during SVS',
        'Alliances that only participate to achieve essential reward scores will be automatically excluded from NAP',
        'Agreements between alliances within the NAP must be communicated to all members for transparency',
        'Regular meetings will be held to discuss strategies and resolve conflicts',
      ]
    },
    {
      id: 'coexistence-rules',
      title: 'Coexistence Rules',
      icon: Users,
      color: '#8efff9',
      summary: 'Basic rules for peaceful coexistence and alliance growth.',
      details: [
        'Encourage the growth of small alliances in peacetime',
        'Do not destroy banners or HQ - encourage passage of other alliances to facilities',
        'Non-response from R4/R5 within 24 hours implies right to destroy banner',
        'Must notify NAP and demonstrate communication attempt via Discord screenshot',
        'Academy/farm protection limited to only 1 per alliance',
        'Academy name must reference the main alliance',
        'Attacks on facilities are not allowed'
      ]
    },
    {
      id: 'city-attack-rules',
      title: 'City Attack Rules',
      icon: Sword,
      color: '#bf00ff',
      summary: 'Specific rules governing attacks on cities and territories.',
      details: [
        'Tile attacks are allowed.',
        'No city attacks against players from any alliance.',
        'City attacks are still allowed on players without an alliance.'
      ]
    },
    {
      id: 'fsh-rules',
      title: 'F/SH Rules',
      icon: Heart,
      color: '#ff004f',
      summary: 'Fort and Stronghold event participation guidelines.',
      details: [
        '5 F: NAP alliances, 5 F: Neutral alliances, 2 F: Non-NAP alliances',
        'SH: Neutral alliances only',
        'NAP alliances must open a rally so maximum number of players reach initial prize',
        'If non-NAP alliance player attacks individually to get initial prize, they can be chased',
        'Chase punishment: receive an attack in their city'
      ]
    },
    {
      id: 'misconduct-sanctions',
      title: 'Types of Misconduct & Sanctions',
      icon: AlertTriangle,
      color: '#fbbf24',
      summary: 'Classification of violations and corresponding penalties.',
      misconductTypes: [
        {
          level: 'VERY SERIOUS',
          color: '#ff004f',
          violations: ['Attacking facilities during events'],
          sanctions: [
            'Expulsion from NAP',
            'Exclusion from alliance participation in SFC through rallies',
            'Individual attacks allowed to obtain points'
          ]
        },
        {
          level: 'GRAVE',
          color: '#bf00ff', 
          violations: [
            'Burning banners or HQ without NAP communication',
            'Failure to comply with city attack rules'
          ],
          sanctions: [
            'Exclusion from participating in SFC rallies',
            'Individual attacks still allowed',
            'Applied for single GRAVE offense or 3 MINOR offenses'
          ]
        },
        {
          level: 'MINOR',
          color: '#fbbf24',
          violations: ['Individual F/SH attack to obtain initial prize'],
          sanctions: ['Player exclusion from Fort Battles for 1 phase of the season']
        }
      ]
    }
  ];

  const toggleRule = (ruleId: string) => {
    setExpandedRule(expandedRule === ruleId ? null : ruleId);
  };

  return (
    <section id="rules" className="py-20 bg-gradient-to-br from-[#050d1c]/70 to-[#0f172a]/70 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-[#8efff9] font-mono text-sm mb-4">
            &gt; NAP3_PROTOCOL_SPECIFICATION...
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gradient text-glow-cyan mb-6">
            NAP3: Three Pillars of Strategic Cooperation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive ruleset ensuring <span className="text-[#00f0ff]">harmony, coordination, and mutual benefit</span>
            for all member alliances in the NAP3 system.
          </p>
          <div className="mt-6 text-[#8efff9] font-mono text-sm">
            &gt; PROTOCOL_STATUS: ACTIVE | ENFORCEMENT: MANDATORY | COMPLIANCE: 100%
          </div>
        </motion.div>

        {/* Rules Accordion */}
        <div className="space-y-6 mb-16">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative panel-neon backdrop-blur-md rounded-lg overflow-hidden"
            >
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: rule.color }} />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: rule.color }} />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: rule.color }} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: rule.color }} />

              {/* Rule Header */}
              <button
                onClick={() => toggleRule(rule.id)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-[#00f0ff]/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center border"
                    style={{ 
                      backgroundColor: `${rule.color}20`,
                      borderColor: rule.color,
                      boxShadow: `0 0 10px ${rule.color}30`
                    }}
                  >
                    <rule.icon 
                      className="w-6 h-6" 
                      style={{ 
                        color: rule.color,
                        filter: `drop-shadow(0 0 3px ${rule.color})`
                      }} 
                    />
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-heading font-bold text-white font-mono">
                        🔹 {rule.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 mt-1 text-sm">
                      {rule.summary}
                    </p>
                  </div>
                </div>
                
                {expandedRule === rule.id ? (
                  <ChevronUp className="w-6 h-6 text-[#00f0ff]" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#00f0ff]" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                )}
              </button>

              {/* Rule Details */}
              {expandedRule === rule.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 border-t border-[#00f0ff]/30"
                >
                  <div className="pt-6">
                    {rule.id === 'misconduct-sanctions' && rule.misconductTypes ? (
                      <div className="space-y-6">
                        <h4 className="font-semibold text-[#00f0ff] mb-4 font-mono">VIOLATION_CLASSIFICATIONS:</h4>
                        {rule.misconductTypes.map((misconduct, misconductIndex) => (
                          <div 
                            key={misconductIndex}
                            className="panel-neon p-4 rounded border"
                            style={{ borderColor: misconduct.color }}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <span 
                                className="px-3 py-1 rounded font-mono text-sm font-bold border"
                                style={{ 
                                  backgroundColor: `${misconduct.color}20`,
                                  borderColor: misconduct.color,
                                  color: misconduct.color
                                }}
                              >
                                {misconduct.level}
                              </span>
                            </div>
                            
                            <div className="mb-4">
                              <h5 className="text-gray-300 font-mono text-sm mb-2">VIOLATIONS:</h5>
                              <ul className="space-y-2">
                                {misconduct.violations.map((violation, vIndex) => (
                                  <li key={vIndex} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: misconduct.color }} />
                                    <span className="text-gray-300 text-sm leading-relaxed">{violation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="text-gray-300 font-mono text-sm mb-2">SANCTIONS:</h5>
                              <ul className="space-y-2">
                                {misconduct.sanctions.map((sanction, sIndex) => (
                                  <li key={sIndex} className="flex items-start space-x-3">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: misconduct.color }} />
                                    <span className="text-gray-300 text-sm leading-relaxed">{sanction}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-[#00f0ff] mb-4 font-mono">PROTOCOL_DETAILS:</h4>
                        <ul className="space-y-3">
                          {rule.details && rule.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-[#8efff9] mt-0.5 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px #8efff9)' }} />
                              <span className="text-gray-300 leading-relaxed text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Rules;