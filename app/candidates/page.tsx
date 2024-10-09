"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Building } from 'lucide-react'

// Mock API call
const fetchCandidates = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      name: 'Lucas',
      location: 'Vancouver, BC, Canada',
      currentPosition: 'Customer Success Executive',
      company: 'Monday.com',
      score: 8.9,
      experience: [
        { title: 'Customer Success Executive', company: 'Monday.com', period: 'May 2020 - Present' },
        { title: 'Customer Success Manager', company: 'Freshworks', period: 'July 2017 - April 2020' },
        { title: 'Customer Success Manager', company: 'Zendesk', period: 'March 2015 - June 2017' },
      ],
      strengths: [
        '9+ years in Customer Success roles',
        '3+ years in mid-size companies',
        'Achieved $0 churn at Freshworks Systems',
        'Background in software development industry',
        'Managed $1,000,000+ ARR accounts',
      ],
      gaps: [
        'Limited upselling experience',
        'Primarily worked with large enterprises',
      ],
      shortlisted: true,
    },
    {
      id: 2,
      name: 'Jackson',
      location: 'Minneapolis, MN, USA',
      currentPosition: 'Senior Customer Success Manager',
      company: 'HubSpot',
      score: 8.4,
      experience: [
        { title: 'Senior Customer Success Manager', company: 'HubSpot', period: 'September 2019 - Present' },
        { title: 'Customer Success Manager', company: 'Drift', period: 'March 2016 - August 2019' },
        { title: 'Customer Success Manager', company: 'Slack', period: 'June 2015 - February 2016' },
      ],
      strengths: [
        '9+ years in Customer Success roles',
        '3+ years in mid-size companies',
        'Managed $1,000,000+ ARR accounts',
        'Worked for similar size series B startup',
      ],
      gaps: [
        'Limited experience in HR Tech',
        'Short tenure at Slack (less than a year)',
      ],
      shortlisted: true,
    },
    // Add more candidates here...
  ]
}

const RadialProgress = ({ value, size = 80 }) => {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 10) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={value >= 8 ? "#4CAF50" : value >= 6 ? "#FFA500" : "#FF0000"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-xl font-bold">{value}</span>
    </div>
  )
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    fetchCandidates().then(setCandidates)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Success Manager</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Candidates</th>
                <th className="p-4 text-left">Experience</th>
                <th className="p-4 text-left">Details</th>
                <th className="p-4 text-left">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h2 className="text-lg font-semibold">{candidate.name}</h2>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" /> {candidate.location}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Briefcase className="w-4 h-4 mr-1" /> {candidate.currentPosition}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Building className="w-4 h-4 mr-1" /> {candidate.company}
                        </p>
                      </div>
                      <RadialProgress value={candidate.score} />
                    </div>
                  </td>
                  <td className="p-4">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-medium">{exp.title} at {exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    <div>
                      <h3 className="font-semibold mb-2">Strengths</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {candidate.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Gaps</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {candidate.gaps.map((gap, index) => (
                          <li key={index} className="text-sm">{gap}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium mb-2">Shortlist - {candidate.shortlisted ? 'Yes' : 'No'}</p>
                    <div className="space-y-2">
                      <Button className="w-full" variant="default">Approve</Button>
                      <Button className="w-full" variant="secondary">Hold</Button>
                      <Button className="w-full" variant="destructive">Reject</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}