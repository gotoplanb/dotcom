// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'Walkthrough: Prepare for Your Heroku Architecture Credential',
		slug: 'walk-heroku-cert',
		html: `
			<p>The Heroku Architecture credential is an official certification by Salesforce administered through Webassessor. It is atypical for Salesforce certifications, as Heroku is a standalone platform and not run on the Salesforce Platform. Other Salesforce certifications have a bunch of hand's on Trailhead trails to help you get experience. The Heroku Architecture certification, however, is more similar in style to the Amazon Web Services certification exams that assume you already have a few years of experience on the platform before sitting the exam.</p>

			<p>While nothing beats practical experience with Heroku, the concepts should be quite familiar for people with strong fundamentals of an Infrastructure-as-a-Service provider like Amazon Web Services. In this walkthrough of the <a href="https://trailhead.salesforce.com/users/strailhead/trailmixes/prepare-for-your-heroku-architecture-credential">Prepare for Your Heroku Architecture Credential</a> trailmix, I will go through each of the suggested documents and provide my highlights. I will also try to map the Heroku service to a comparable or complimentary AWS service when possible. My objective is to make it easier for an AWS-certified professional to get up to speed with Heroku, pass the certification exam, and have a solid understanding of how to use Heroku and AWS together.</p>

			<h2>Heroku Architecture Credential Overview</h2>

			<p>My first impression is the audience is closest to AWS Certified Solution Architect Associate content with some sprinkles of the AWS Certified Developer Associate. The primary focus is to know what services are avialble and how to architect a solution versus knowing how to do things on the job.</p>
			
			<p>Heroku Enterprise is similar to AWS Elastic Beanstalk, in that you really just care about your application code and don't need to worry about the underlying infrastracture. Code runs in a container. There are preconfigured stacks, or you can define your own via buildpacks. The security and trust concepts are akin to AWS IAM and can similar hook into additional auth providers for SSO.</p>

			<p>Heroku Postgres is wonderful. AWS provides Postgres through the RDS service. There are pretty simple ways to do replication between AWS and Heroku. I assume future sections of the study guide will cover this stuff. The exam also covers Redis, which is part of the AWS ElastiCache service.</p>

			<p>You use Heroku Add-ons for things like data stores, logs, etc. that you would just provision directly in AWS. The real interesting distinction is that Heroku treats and app as the primary container for components. You provision an add-on for an existing app. Add-ons do not stand alone. For example, you create your an app that has by default some web server. Then, you can provision Posgres, Redis, logs, etc. to be attached to the app. All the auth stuff is handled for you via environmental variables instead of you having to create a bunch of AWS IAM policies to auth between all the services. Heroku does not give you the super granular control like AWS IAM but wow is it so much simpler to use while maintaining trust and security.</p>

			<p>Heroku Private Spaces are basically a branded verison of an AWS VPC. You use Private Spaces to have internal-only routing of traffic between apps and add-ons -- data does not traverse the public internet to get between components. This is tremendously valuable in regulated industries and also just as a stronger security posture. Heroku Private Spaces can also peer to an AWS VPC through the same kind of VPC-peering pattern you would use to peer two AWS VPCs. Private spaces are a great way to follow Twelve-Factor methodology while also complying with industry standards.</p>

			<p>Heroku Connect is a connector and integration tool to map and sync data between a Postgres database and a Salesforce instance, which Salesforce folks refer to as an organization or just "org" for short. Heroku Connect allows for mapping between tables, choosing direction and frequency of sync, and a bunch more we'll go through later. Heroku Connect can connect to any Postgres database, not just those running inside Heroku. Heroku Connect is a unique service. You could recreate the functionality using AWS Data Pipelines and EC2, but it would be a huge pain.</p>

			<p>Heroku Kafka is a manged version of Kafka. None of the AWS certification exams get into Kafka yet, but the use case is simliar to how AWS recommends AWS SNS and AWS SQS to create decoupled message-driven applications. AWS Kinesis is a similar queueing solution to Kafka. Yes there are differences, but the fundmental information regarding sharding, ordering, producers, and consumers should be similar as far as the certification exams are concerned.</p>

			<h2>The Heroku Dev Center</h2>

			<p>Coming soon.</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
