import { useParams, Link } from "react-router-dom";
import {
    MapPin,
    ArrowLeft,
    Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useCMSTemple } from "@/hooks/useWixCMS";

const TempleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { temple, isLoading } = useCMSTemple(id || "");

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-3xl font-bold text-foreground">Loading...</h1>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!temple) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-3xl font-bold text-foreground">Temple Not Found</h1>
                        <p className="text-muted-foreground">The temple you're looking for doesn't exist.</p>
                        <Button asChild>
                            <Link to="/temples">Back to Temples</Link>
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-hero overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 border border-primary-foreground/50 rounded-full" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 border border-primary-foreground/50 rounded-full" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        to="/temples"
                        className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-body">Back to Temples</span>
                    </Link>

                    <div className="max-w-4xl">
                        <Badge className="bg-saffron text-saffron-foreground border-none mb-4">
                            {temple.deity}
                        </Badge>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                            {temple.name}
                        </h1>
                        <p className="font-body text-lg text-primary-foreground/80 mb-6">
                            {temple.famousFor}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                                <MapPin size={18} className="text-primary-foreground" />
                                <span className="font-body text-primary-foreground">{temple.district}, {temple.state}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Info className="text-primary" /> About the Temple
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {temple.content}
                                </div>
                            </div>

                        </div>

                        <div className="space-y-6">
                            <div className="bg-muted p-6 rounded-2xl">
                                <h3 className="font-display text-xl font-bold text-foreground mb-4">Key Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm text-muted-foreground block mb-1">Primary Deity</span>
                                        <span className="font-medium text-foreground">{temple.deityName || temple.deity}</span>
                                    </div>
                                    {temple.otherDeity && (
                                        <div>
                                            <span className="text-sm text-muted-foreground block mb-1">Other Deities</span>
                                            <span className="font-medium text-foreground">{temple.otherDeity}</span>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-sm text-muted-foreground block mb-1">Location</span>
                                        <span className="font-medium text-foreground">{temple.district}, {temple.state}</span>
                                    </div>
                                    {temple.latitude && temple.longitude && (
                                        <div>
                                            <span className="text-sm text-muted-foreground block mb-1">Coordinates</span>
                                            <span className="font-medium text-foreground">{temple.latitude.toFixed(4)}°N, {temple.longitude.toFixed(4)}°E</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-card shadow-card p-6 rounded-2xl text-center border border-border">
                                <h3 className="font-display text-lg font-bold text-foreground mb-2">Visit this Temple</h3>
                                <p className="text-sm text-muted-foreground mb-4">Book a pilgrimage package that includes this divine destination.</p>
                                <Button asChild className="w-full bg-saffron text-saffron-foreground hover:bg-saffron/90">
                                    <Link to="/pilgrimage">Explore Packages</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TempleDetail;
