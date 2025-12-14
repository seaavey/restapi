'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DocSection } from './DocSection';
import { useEffect, useState } from 'react';

interface DocSectionType {
    title: string;
    description: string;
    endpoint: string;
    method: string;
    parameters?: Array<{
        name: string;
        type: string;
        required: boolean;
        description: string;
    }>;
    exampleRequest?: string;
    exampleResponse?: string;
}

interface DocData {
    title: string;
    description: string;
    sections: DocSectionType[];
}

export default function DocsBody({ category, feature }: { category?: string; feature?: string }) {
    const [docData, setDocData] = useState<DocData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocumentation = async () => {
            try {
                setLoading(true);

                // In a real implementation, you would fetch from an API or static content
                // For now, I'll create mock documentation based on category and feature
                const mockData: DocData = generateMockDocumentation(category || '', feature || '');
                setDocData(mockData);
                setError(null);
            } catch (err) {
                setError('Failed to load documentation');
                console.error('Error loading docs:', err);
            } finally {
                setLoading(false);
            }
        };

        if (category && feature) {
            fetchDocumentation();
        } else {
            // Load introduction page
            setDocData({
                title: 'Introduction',
                description:
                    'Welcome to the Seaavey APIs documentation. Here you will find comprehensive guides and references to help you get started with our services.',
                sections: [
                    {
                        title: 'Getting Started',
                        description: 'Learn the basics of how to use our API services.',
                        endpoint: '/api/v1',
                        method: 'GET',
                        parameters: [],
                        exampleRequest: '{}',
                        exampleResponse:
                            '{\n  "status": "success",\n  "data": {\n    "message": "Welcome to Seaavey APIs"\n  }\n}',
                    },
                    {
                        title: 'Authentication',
                        description:
                            'All API requests require an API key to be included in the header.',
                        endpoint: '/api/v1',
                        method: 'GET',
                        parameters: [
                            {
                                name: 'Authorization',
                                type: 'string',
                                required: true,
                                description: 'Bearer token for authentication',
                            },
                        ],
                        exampleRequest: '{ headers: { "Authorization": "Bearer YOUR_API_KEY" }}',
                        exampleResponse: '{\n  "status": "success",\n  "data": {}\n}',
                    },
                    {
                        title: 'Rate Limits',
                        description: 'Our API has rate limits to ensure fair usage.',
                        endpoint: '/api/v1',
                        method: 'GET',
                        parameters: [],
                        exampleRequest: '{}',
                        exampleResponse:
                            '{\n  "status": "success",\n  "data": {\n    "rate_limit": 1000,\n    "remaining_calls": 999\n  }\n}',
                    },
                ],
            });
            setLoading(false);
        }
    }, [category, feature]);

    // Render loading state
    if (loading) {
        return (
            <div className="flex flex-1 flex-col p-6">
                <div className="animate-pulse space-y-6">
                    <div className="bg-muted h-8 w-1/3 rounded"></div>
                    <div className="bg-muted h-4 w-2/3 rounded"></div>
                    <div className="bg-muted h-4 w-1/2 rounded"></div>

                    {[1, 2, 3].map(item => (
                        <div key={item} className="space-y-4">
                            <div className="bg-muted h-6 w-1/4 rounded"></div>
                            <div className="bg-muted h-4 w-full rounded"></div>
                            <div className="bg-muted h-4 w-5/6 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex flex-1 flex-col p-6">
                <Card className="mx-auto max-w-4xl">
                    <CardHeader>
                        <CardTitle>Error Loading Documentation</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Please try again later or contact support if the issue persists.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="prose prose-slate dark:prose-invert mx-auto w-full max-w-4xl p-6">
                {docData && (
                    <>
                        <h1 className="mb-4 text-3xl font-bold">{docData.title}</h1>
                        <p className="text-muted-foreground mb-8 text-lg">{docData.description}</p>

                        {docData.sections.map((section, index) => (
                            <DocSection
                                key={index}
                                section={section}
                                index={index}
                                totalSections={docData.sections.length}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

// Helper function to generate mock documentation based on category and feature
function generateMockDocumentation(category: string, feature: string): DocData {
    // Mock data based on the navigation structure
    if (category.toLowerCase() === 'search' && feature.toLowerCase() === 'lyrics') {
        return {
            title: 'Search Lyrics',
            description: 'Search for song lyrics using our comprehensive database.',
            sections: [
                {
                    title: 'Endpoint',
                    description: 'Search for lyrics by song title, artist, or both.',
                    endpoint: '/api/v1/search/lyrics',
                    method: 'GET',
                    parameters: [
                        {
                            name: 'title',
                            type: 'string',
                            required: false,
                            description: 'Song title to search for',
                        },
                        {
                            name: 'artist',
                            type: 'string',
                            required: false,
                            description: 'Artist name to search for',
                        },
                        {
                            name: 'limit',
                            type: 'number',
                            required: false,
                            description: 'Number of results to return (default: 10, max: 50)',
                        },
                    ],
                    exampleRequest: `GET /api/v1/search/lyrics?title=Bohemian Rhapsody&artist=Queen`,
                    exampleResponse: `{
  "status": "success",
  "data": [
    {
      "id": "song_id",
      "title": "Bohemian Rhapsody",
      "artist": "Queen",
      "album": "A Night at the Opera",
      "year": 1975,
      "preview": "Is this the real life? Is this just fantasy?..."
    }
  ]
}`,
                },
            ],
        };
    } else if (category.toLowerCase() === 'search' && feature.toLowerCase() === 'chords') {
        return {
            title: 'Search Chords',
            description: 'Search for guitar chords for songs.',
            sections: [
                {
                    title: 'Endpoint',
                    description: 'Search for chords by song title, artist, or both.',
                    endpoint: '/api/v1/search/chords',
                    method: 'GET',
                    parameters: [
                        {
                            name: 'title',
                            type: 'string',
                            required: false,
                            description: 'Song title to search for',
                        },
                        {
                            name: 'artist',
                            type: 'string',
                            required: false,
                            description: 'Artist name to search for',
                        },
                        {
                            name: 'limit',
                            type: 'number',
                            required: false,
                            description: 'Number of results to return (default: 10, max: 50)',
                        },
                    ],
                    exampleRequest: `GET /api/v1/search/chords?title=Wonderwall&artist=Oasis`,
                    exampleResponse: `{
  "status": "success",
  "data": [
    {
      "id": "chord_id",
      "title": "Wonderwall",
      "artist": "Oasis",
      "key": "Em",
      "difficulty": "Intermediate",
      "chords": ["Em", "G", "C", "D", "Am"]
    }
  ]
}`,
                },
            ],
        };
    } else if (category.toLowerCase() === 'song' && feature.toLowerCase() === 'lyrics') {
        return {
            title: 'Get Song Lyrics',
            description: 'Retrieve full lyrics for a specific song.',
            sections: [
                {
                    title: 'Endpoint',
                    description: 'Get full lyrics for a song by ID.',
                    endpoint: '/api/v1/song/lyrics',
                    method: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            required: true,
                            description: 'Unique identifier of the song',
                        },
                    ],
                    exampleRequest: `GET /api/v1/song/lyrics?id=song_id`,
                    exampleResponse: `{
  "status": "success",
  "data": {
    "id": "song_id",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "year": 1975,
    "lyrics": "Is this the real life? Is this just fantasy?...
Caught in a landslide, no escape from reality..."
  }
}`,
                },
            ],
        };
    } else if (category.toLowerCase() === 'song' && feature.toLowerCase() === 'chords') {
        return {
            title: 'Get Song Chords',
            description: 'Retrieve guitar chords for a specific song.',
            sections: [
                {
                    title: 'Endpoint',
                    description: 'Get chord progression and details for a song by ID.',
                    endpoint: '/api/v1/song/chords',
                    method: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            required: true,
                            description: 'Unique identifier of the song',
                        },
                    ],
                    exampleRequest: `GET /api/v1/song/chords?id=chord_id`,
                    exampleResponse: `{
  "status": "success",
  "data": {
    "id": "chord_id",
    "title": "Wonderwall",
    "artist": "Oasis",
    "key": "Em",
    "difficulty": "Intermediate",
    "chords": ["Em", "G", "C", "D", "Am"],
    "progression": [
      {
        "time": "0:00",
        "chord": "Em",
        "lyric": "Today is gonna be the day"
      },
      {
        "time": "0:04",
        "chord": "G",
        "lyric": "That they're gonna throw it back to you"
      }
    ]
  }
}`,
                },
            ],
        };
    }

    // Default fallback
    return {
        title: `${feature} Documentation`,
        description: `Comprehensive guide for the ${feature} feature in the ${category} category.`,
        sections: [
            {
                title: 'Overview',
                description: `This section provides information about the ${feature} feature under the ${category} category.`,
                endpoint: `/api/v1/${category}/${feature}`,
                method: 'GET',
                parameters: [
                    {
                        name: 'api_key',
                        type: 'string',
                        required: true,
                        description: 'Your API key for authentication',
                    },
                ],
                exampleRequest: `GET /api/v1/${category}/${feature}`,
                exampleResponse: `{
  "status": "success",
  "data": {
    "message": "This is sample documentation for ${category} - ${feature}"
  }
}`,
            },
        ],
    };
}
