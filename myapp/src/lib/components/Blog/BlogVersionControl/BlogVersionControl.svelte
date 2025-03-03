<script>
    import BlogProfileCard from "../BlogProfileCard.svelte";
    import BlogAdvancedVersionHistory from "./BlogAdvancedVersionHistory/BlogAdvancedVersionHistory.svelte";
    import BlogArticleStatus from "./BlogArticleStatus.svelte";
    import BlogBasicVersionHistory from "./BlogBasicVersionHistory.svelte";
    import BlogContributors from "./BlogContributors.svelte";
</script>


<div class="flex items-center gap-4">
    <BlogBasicVersionHistory />
    <BlogAdvancedVersionHistory />
    <BlogContributors />
    <BlogArticleStatus />
</div>