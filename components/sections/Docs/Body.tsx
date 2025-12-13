import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function DocsBody() {
    return (
        <div className="flex flex-1 flex-col">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Card Content</CardContent>
                <CardFooter>Card Footer</CardFooter>
            </Card>
        </div>
    );
}
