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

			<p>The Trailmix says this is a 5-minute link. Ha. To do this section right, expect to spend at least an hour to follow every step and do some additional fiddling.</p>

			<p>Heroku provides a getting-started guide using your language of choice. I went with JavaScript/Node. I had previously installed the Heroku CLI, so I made sure to run <code>brew update && brew upgrade && heroku --version</code> to make sure I was on the latest stable version. I'm using v7.26.2 at the time of writing this walkthrough.</p>

			<p>The sample app install works as expected. I also suggest you add the <a href="https://devcenter.heroku.com/articles/heroku-cli-autocomplete">autocomplete plugin</a> to make CLI usage much easier. Also, as we cloned the example project from GitHub, you might want to get rid of the origin remote, as you will never be pushing back to it. <code>git remote -v</code> to see all the remotes. You should <code>origin</code> from when you did the origin clone and <code>heroku</code> remote as a result of running the <code>heroku create</code> command. You can remove the GitHub remote by running <code>git remote rm origin</code>. If you run into an error when you try to provision compute resources with <code>heroku ps:scale web=1</code>, make sure you actually deployed the app with <code>git push heroku master</code> first.</p>

			<p>Heroku Dynos are the primary compute resource you will use. They are kind of like AWS EC2 instances but with all the complexity taken care of for you. You can either manually or auto scale, and you can run most any application code by including a <code>Procfile</code>, which is akin to an AWS CloudFormation template. The whole flow of Heroku is most similar to AWS Elastic Beanstalk including pipelines, slots, and one-click promotion of an app between environments for blue-green deployments. In my opinion you should always use Heroku instead of AWS Elastric Beanstalk. There are some exceptions, but this is a very good rule to follow. Use AWS if you have intense container-management needs and ultra-particularly access requirements, and then have development teams use Heroku Pipelines.</p>

			<p>As you start setting up Heroku Piplines, which I'm sure we will cover later, you won't necessarily have a git remote named <code>heroku</code>, as you instead setup continuous integration and deployments from a hosted git remote like GitHub or GitLab. In this scenario, pretty much ever CLI command is going to fail for you because the CLI won't implictly understand which app you are targeting without having the heroku remote tracked in the local git config. No worries, you can just by using the app argument and explictly pass the name of the app. You can test this by changing to some other arbitrary directory on your computer and then running <code>heroku logs --tail --app morning-cliffs-8675309</code>. Substitute in your app's name. This is where the CLI autocomplete becomes super handy.</p>

			<p><code>heroku local web</code> run your app locally, but this warrants some further explanation. Really you're just running a local webserver. The rest of your add-ons are probably running on Heroku. So, you do get some benefits of having your app rebuilding on local code changes and before you commit to git, but you aren't getting an offline environment. If you want to be able to develop online, you'll have a ton of additional work to setup mocks or run stuff Postgres, etc. locally. Postgres is easy enough to run locally and then use environmental variables to use a local db host when running the web server locall, but this becomes a huge pain if you go all-in with Heroku and us add-ons for auth and whatnot. tl;dr Assume that you need to be online to develop apps for Heroku when you are using anything other than just dynos/compute.</p>

			<p>Heroku add-ons are great. Use Papertrail on every project as a default. It's also super handy that you can SSO from Heroku into pretty much every add-on's management concsole, saving you a ton of headache managing secrets on your team. Just control access to the apps themselves, and then people can get into the add-ons they need. It's actaully quite amazing how many add-ons have free tiers. Also, you don't have to worry about unexpected bills. If you reach a tier maximum, Heroku will tell you the add-on will stop working. It's up to you to then scale that add-on to a paid tier. This is in stark contrast to AWS, where pretty much everythign costs some money to use, and if you leave on certain resources, you can quickly wake up to a few hundred dollars in unexpected charges. Heroku is much safer for experimenting with add-ons.</p>

			<p><code>heroku run bash</code> creates a <a href="https://devcenter.heroku.com/articles/one-off-dynos">one-off dyno</a> for tasks for the app. These one-off dynos are not meant for editing files. You can even experiment by using Bash to delete whatever files you want, but then when you via the app in browser, all will function normally. Instead, use the one-off instances for running database migrations or other kinds of data-modeling introspection. Use <code>heroku run:detached</code> to send output to your logs/Papertrail instead of the console.</code></p>

			<p>Run <code>heroku ps</code> to see what processess you have running. Heroku is super nice to even tell you which pricing tier for each process. You should stop processess you no longer need to conserve your free time or cash money. One-off dynos are shut off after one hour of inactivity. <code>heroku ps:stop web.1</code> will idle your web server. This is like turning off an AWS EC2 instance. Once you visit the URL for the app, Heroku will nicely start the web server for you. You'll notice a slow load the first time as the web server gets going. Heroku <a href="https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping">auto-sleeps dynos</a> that haven't served a request for 30 minutes. Heroku does this to save themselves some money, but it also helps the user to not run out of free time. If you can't tolerate the few seconds it takes a dyno to power up after activity, you probably want to scale to the Hobby dyno tier. There are different ways to keep dynos alive, but if you are hacking this limit, you are probably just going to cause yourself some other problem. That said, you can install the <a href="https://elements.heroku.com/addons/newrelic">New Relic</a> monitoring add-on and set a reporting interval of 30 seconds. New Relic is great, and you probably want to consider for your product apps anyway.</p>

			<p>When you start modifying <code>index.js</code>, be sure that you are adding your additional <code>.get</code> routes before the line with <code>.listen</code> or else the routes will not be available and the web server will crash.</p>

			<p>You set enviornmental variables locally via the <code>.env</code> file and then run <code>heroku local</code> to load the environmental variables and then the web server. To update environmental variables for your Heroku apps, you either can set in the CLI via <code>heroku config:set <key>:<value></code> or via the browser-based management console for your apps at a URL like <code>https://dashboard.heroku.com/apps/morning-cliffs-8675309/settings</code>.</p>

			<p>Getting PostgreSQL running can be a little bit of a pain. I used <code>brew cask install postgres</code> and then started the local database server with TODO. If you're going to be actually using Heroku, you will be using Posgres a lot, so it is worth it to buy a client like <a href="https://macpostgresclient.com/">SQLPro for Postgres</a>. If you run <code>heroku config</code> to get the database connection string, you can split out all the pieces you need to connect from SQLPro for Postgres directly to your Heroku Postgres database. For example: <code>user = rmxfxlaxgoetzy , password = ab0097923284d13a9d8a87068f6abb40da39cd2688b72a5dfcf832addba775ae , host = ec2-107-20-237-237.compute-1.amazonaws.com , port = 5432 , database = 2dq5lmvp72fdec</code></p>

			<h2>How Heroku Works</h2>

			<p>Heroku should auto-run your apps by analyzing the file types. If you need anything other than barebones defaults, you probably will use a <a href="https://devcenter.heroku.com/articles/procfile">Procfile</a> to define the stack and build configuration. Each line of the <code>Procfile</code> let's to target a process and pass the command that process should run. For example: <code>web: bundle exec rails server -p $PORT</code> for a Rails project.</p>

			<p>Deployments are done via Git. You can either push a Git commit to Heroku and cause the app to build or you can push to an arbitrary Git remote (e.g. GitHub) and then have Heroku listening for changes. On commit to the remote, Heroku can pull and build.</p>

			<p>Commands you will use often:</>

			<dl>
				<dt><code>heroku ps</code></dt>
				<dd>List processes for the given app</dd>
			</dl>

			<dl>
				<dt><code>heroku logs</code></dt>
				<dd>View logs for the app</dd>
			</dl>

			<dl>
				<dt><code>heroku ps:scale web=2 worker=4</code></dt>
				<dd>Scale the web process to 2 dynos and worker process to 4 dynos</dd>
			</dl>

			<p>The names for the process are arbitrary, other than web. You can create whatever processess you want including multiple workers so that you have multiple queues. If you want to build Docker images, use a <code>heroku.yml</code> instead of a <code>Procfile</code>.</p>

			<h2>Heroku Enterprise Basics</h2>

			<p>Most of the Trailhead module is pretty straight forward and a repeat of the work you did in the Heroku getting-started guide. Heroku Enterprise gives you Heroku Connect, single sign-on, Private Spaces, and optionally technical support.</p>
			
			<p>A Heroku Enterprise Team can have admin, member, and viewer roles. Users can have four different "privilege sets" for an app: view, deploy, operate, and manage. Privilege sets are added ad-hoc and are not cumulative. For example, a user could have <code>deploy</code> and <code>operation</code> or maybe just one of them. Review the <a href="https://devcenter.heroku.com/articles/app-permissions">matrix of privileges by role</a>. All users get <code>view</code> by default. If a user has the <code>manage</code> privilege, then that user can assign themself additional privileges. Only admins can mess with <a href="https://devcenter.heroku.com/articles/private-spaces#private-space-management">Private Spaces</a>. Enterprise teams can have a whitelist of add-ons, so that members can provision at will for apps within the team. The <code>deploy</code> privilege lets a user provision paid add-ons, while the <code>operate</code> privilege allows for paid add-ons.</p>

			<p>Consolidated billing shows resources usage (e.g. dyno count) and total spend across the team. You also get historical trends. You can set maximums for dynos and aggregate add-on spend per month. These caps are at the team level. I do not think you can set at the app level.</p>

			<p>Heroku Connect syncs data between a Salesforce org and a Postgres database. There is a future section on Heroku Connect, so I will avoid descending into detail for now.</p>

			<p>Heroku Enterprise supports Salesforce Identity, Okta, Bitium, and Ping identity providers by default or any SAML 2.0–compliant identity provider if you want it bad enough.</p>

			<p>Heroku Private spaces are basically a whitelabeled AWS VPC. Your resources are collocated, so that all inter-process traffic is kept inside a private IP range and does not traverse the public internet. You pay a lot for this, but you may need to for compliance reasons. Also your latency will be much faster.</p>

			<p>Heroku Enterprise allows you to get more support. There is not standard pricing this support. I assume SLAs are negotiated.</p>

			<h2>Dynos, Stacks, Networking</h2>

			<p>coming soon</p>
		`
	},
	{
		title: 'Walkthrough: Lightning Experience Specialist Superbadge',
		slug: 'walk-lex-specialist-sb',
		html: `
			<p>I wasn't sure whether to work on this Superbadge first or the Lightning Experience Rollout Specialist. Seemed better to know a thing than how to rollout a thing, so here is where I started. Also that other superbadge is estimtated to take twice as long at 12 hours. Yikes! Hopefully going through this superbadge first will help the other go faster.</p>

			<h2>Sections</h2>
			
			<h3>Prework and Notes</h3>

			<p>Remember opportunity product service dates from 1/1/2026 to 12/31/2026. I found all the object renaming an unnecessary complication that led to confusion and self-doubt.</p>

			<h3>Use Case</h3>

			<p>Nothing to note.</p>

			<h3>Standard Objects</h3>

			<p>You cannot rename standard objects from the Object Manager. Instead you have to use the "Rename Tabs and Labels" screen in Setup. When you try to add Case record types, you will get a message that says you need a Support Process first. I created one called "Issues" and then created the two record types. Based off master. Be sure to set as active. I assign Case Layout as the layout for all profiles.</p>

			<p>Adventure Package uses OpportunityLineItem.ServiceDate field for the date of the adventure.</p>

			<h3>Custom Objects</h3>

			<p>Fulfillment object is like an order. Unsure why we are using a custom object here whereas we used renamed standard objects elsewhere.</p>

			<h3>Sales Process Customization</h3>

			<p>Stage updates are on the now-named Adeventure object. I created a New stage and then deleted all of the opportunity stages picklist values and just rebuilt from scratch. I left all stages as pipeline values. I left all stages as Open status except for Completed as Closed/Won status and Cancelled as Closed/Lost status.</p>

			<p>Create a Path for the Opportunity object using the Stage picklist. The validator didn't yell at me even when I didn't have the path. I also enabled confetti for the Completed stage because why not have a little fun.</p>

			<h3>Opportunity Discount Approvals</h3>

			<p>Remember to create another user and set this user as your manager. Otherwise you'll get some really cryptic errors. I created an approval step, then approval and rejection actions on that step. I did not create final approval or rejection step.</p>

			<h3>Fulfillment Creation</h3>

			<p>This is Process Builder stuff. The "Name" field in the first column is really Fulfillment Name. The "Id" in the third column is really "Line Item ID". The formula is <code>[OpportunityLineItem].Product2.Name + " - " + [OpportunityLineItem].Id </code></p>

			<h3>Sales Automation</h3>

			<p>When they say opportunity status, they really mean the stage field. Edit the page layout for Opportunities, and add Fulfillments to the related lists. This will make it much easier to validate your work. Since Lightning will refresh each component on the page separately, you'll notice a quick flash during re-rendering when the Fulfillments are updated as a result of your process.</p>

			<h3>Fulfillment Cancellation Automation</h3>

			<p>This process uses a filter criteria for updating records, since when you get <code>[Fulfillment__c].Opportunity.OpportunityLineItems</code> the result is a list becuase this is a master-detail relationship. You can't iterate through a list with Process Builder, so you need use a filter formula to get the specific Opportunity Line Item (aka Adventure Package) item.</p>

			<p>As an aside, you can iterate through a list with a Flow. If you needed to update all ofthe detail records, you would move your update logic into the Flow then have your Process Builder action be to call the Flow from the master side.</p>

			<h3>Support Process</h3>

			<p>Case Reason is a picklist on the Case object. Delete the old values, and add the new values.</p>
			
			<h3>Expedition Leader Support</h3>
			
			<p>Now we need to create a new action on the Fulfillment object to create a Case record. Select a record type. Your name will be <code>New_Expedition_Leader_Case</code>. Add the fields as described. Explorer is really Contact Name. Also add the predefined value for priority as high. The other two fields are autopoplated from forumulas.</p>

			<p>Edit the Fulfillment object page layout. Add the "New Expedition Leader Case" global action to the "Mobile & Lightning Actions" section of the layout.</p>

			<h3>Import Data</h3>

			<p>I uploaded the XLSX file to Google Sheets, so that I could download each as a CSV. There are not that many Explorer records, so the Data Import Wizard should work. I did not match Contacts or Accounts. All mappings should be the Explorer (aka Contact) fields.</p>

			<p>Adventures (aka Product2) and Opportunity records cannot be uploaded via the Data Import Wizard. You can use either the <a href="https://dataloader.io">web-based Data Loader</a> or <a href="https://help.salesforce.com/articleView?id=loader_install_mac.htm">download Data Loader</a> for you computer. I used the web version.</p>

			<p>Before importing Opportunities, you can should create a record type named <code>Individual Opportutunity</code>. While you are in setup, also look at Opportunity Contact Roles and set one of the values as default. When you upload Opportunity Contact Roles later, you will need a default, so that these junction objects are made for you.</p>

			<p>Upload your adventures (aka products). I then made sure each product was added to the standard pricebook.</p>

			<p>Note that the <code>Opps w Adventure + Explorer</code> sheet is denormalized, meaning it containts data that needs to get loaded into multiple objects -- opporunities, opportunity contact roles, and adventure packages. This definitely tripped me up the first time through.</p>

			<p>Upload opportunities. Map as many fields as are relevant. Lookup explorers by <code>Full Name</code>. Upload opprtunity contact roles. Map opportunity by <code>Name</code> and explorers by <code>Full Name</code>. Upload adventure packages. Map adventure, explorer, quanity, and sales price. Lookup adventure by <code>Product Code</code> and explorers by <code>Full Name</code>.</p>

			<h3>UI Changes for Sales Reps</h3>

			<p>Go to any adventure record, edit page, then add the <code>PictureGallery</code> custom component. Save. Activate as org default.</p>

			<p>Create the report using the <code>Opportunities with Adventures</code> type. Notice the product dates filter should be in the year 2026. Group by product name. Group by stage. Save and run. Save in the public reports folder. Stacked vertical bar is the same thing as a stacked column chart. All of my adventures (aka opportunties) were in the new stage, so I edited a few to be different stages to verify the stacked vertical bar chart was grouping as expected.</p>

			<p>Edit the adventure record page again. There is no section component, but I think what they mean is to add a third, custom tab to the existing tabs component and name this <code>Adventure Comparison</code>. I made this custom tab come after the Details tab. </p>

			<h3>UI Changes for the Fulfillment Team</h3>

			<p>This section is asking you to set a compact layout that will populate the Highlights component on a record page. Go to setup, Object Manager, Fulfillment, Compact Layouts, then click New. Type any name. Select the five fields mentioned in the instructions then click Save. Click comact layout assignemnt, edit assignment, select your new compact layout from the picklist, then Save.</p>

			<h3>General UI Changes</h3>

			<p>I edited the visibile tabs within the Sales (i.e. LightningSales)app via the App Manager. Go to myDomain and change background color to any value.</p>

			<h2>Validation</h2>

			<h3>Take the Sales Path quiz</h3>

			<p>Apparently I already took this. I can't remember. I should add some details here or get feedback from other people.</p>

			<h3>Provide in-app guidance to sales reps</h3>

			<p>There is a ton of stuff to do to get this step to pass. Absolutely should be split into multiple validation steps.</p>
			
			<p><code>Challenge Not yet complete... here's what's wrong: 
			The 'Approval for Package Deal' approval process does not appear to be working properly. Please check the requirement to ensure your process is configured correctly.</code> is too vague and provides no guidance. I think this occurs when the approval process has not been activated.</p>

			<p>If you get cryptic processing errors, and likely an email report, then make sure you created a second user and set as your manager. Even though the approver is the opportunity owner, you might run into this processing problem as the user hierarchy is empty.<p>

			<h3>Take the Lightning Experience rollout quiz</h3>

			<p>Easy peasy lemon squeezy.</p>

			<h3>Automate the creation of fulfillments</h3>

			<p>The renaming of things to be adventures and such made this much more confusing than necessary.</p>

			<h3>Automate your sales process for various opportunity stages</h3>

			<p>No issues.</p>

			<h3>Automate fulfillment cancellation actions</h3>

			<p>Ensure your criteria to update <code>Line Item ID</code> equal <code>[Fulfillment__c].AdventurePackageId__c</code>.</p>

			<h3>Customize support processes</h3>

			<p>Check that your predefined field values are <code>Fulfillment__c.Explorer__r.Id</code> and <code>Fulfillment__c.Id</code>.</p>

			<h3>Import data from legacy systems</h3>

			<p>If you get this wrong, you just get a less-than-helpful messages to make sure you have done everything correctly. Double check an opporunity to ensure you have related adventure packages, fulfillment, and opportunity contact role. </p>

			<h3>Customize the Lightning user interface</h3>

			<p>No issues.</p>

			<h2>Summary</h2>

			<p>This was a pretty fun and informative superbadge to complete. The renaming the standard objects made this more tricky than it needed to be. Also having a denormalized dataset for importing tripped me up on first attempt.</p>
		`
	},
	{
		title: 'Walkthrough: Lightning Experience Rollout Specialist Superbadge',
		slug: 'walk-lex-rollout-sb',
		html: `
			<p>Overall, this superbadge was not hard but was frustrating because there were vague requirements especially related to the readiness report. There were good answers in the Salesforce Developer community for any of the specific errors I had.</p>
		`
	},
	{
		title: 'Cookbook: Creating a native iOS app using Salesforce SDKs',
		slug: 'cook-ios-salesforce-sdks',
		html: `
			<h2>Dependencies</h2>

			<ul>
				<li>forceios CLI</li>
				<li>Xcode</li>
			</ul>
		
			<h2>Setup</h2>

			<h3>Create a Connected App</h3>

			<ol>
				<li>Login to your Salesforce org</li>
				<li>Setup > App Manager > New Connected App</li>
				<li>Enable OAuth Settings</li>
				<li>Add some callback url like <code>testsfdc:///mobilesdk/detect/oauth/done</code></li>
				<li>Select and add <code>api</code>, <code>web</code>, and <code>refresh_token, offline_access</code> to the Selected OAuth Scopes</li>
				<li>Copy the Consumer Key and Callback URL values</li>
				<li>Setup > Permission Sets > New</li>
				<li>Go into the Assigned Connected Apps section of the new Permission Set and click Edit</li>
				<li>Select the Connected App you previously made, add, and save.</li>
				<li>Manage Assignments > Select your user > Assign</li>
			</ol>

			<h3>Create the iOS project</h3>

			<ol>
				<li>Open the terminal</li>
				<li>Run <code>forceios create</code> to make the Swift starter app</li>
				<li>Use Xcode to open the <code>.xcworkshop</code> file</li>
				<li>Open the Supporting Files > <code>bootconfig.plist</code> file</li>
				<li>Update <code>remoteAccessConsumerKey</code> and <code>oauthRedirectUri</code> to match your Connected App</li>
				<li>Add two more <code>oauthScopes</code> items with values <code>refresh_token</code> and <code>offline_access</code></li>
				<li>Build and run the app</li>
			</ol>
		`
	},
	{
		title: 'Cookbook: Creating a new Salesforce DX project',
		slug: 'cook-salesforce-project-dx',
		html: `
			<h2>Dependencies</h2>

			<ul>
				<li>SFDX CLI</li>
				<li>VS Code</li>
				<li>VS Code extensions for Salesforce</li>
				<li><code>sfdx plugins:install @salesforce/lwc-dev-server</code></li>
			</ul>
		
			<h2>Setup</h2>

			<ol>
				<li>Create a new GitHub repository {{project-name}} without a readme</li>
				<li><code>sfdx force:project:create -n {{ProjectName}}</code></li>
				<li><code>cd {{ProjectName}}</code></li>
				<li><code>git init</code></li>
				<li><code>git remote add origin {{git url}}</code></li>
				<li><code>git add .</code></li>
				<li><code>git commit -m "Init."</code></li>
				<li><code>git push origin master</code></li>
				<li><code>sfdx force:auth:web:login -d -a {{DevHubAliasName}}</code></li>
			</ol>

			<h2>Dev</h2>

			<ol>
				<li><code>git pull origin master</code></li>
				<li><code>git checkout -b {{feature/branch-name}}</code></li>
				<li><code>sfdx force:org:create -a {{BranchName}} -s -f config/project-scratch-def.json -d 30</code></li>
				<li><code>sfdx force:lightning:lwc:start</code><li>
				<li><code>code .</code></li>
				<li>SFDX: Pull Source from Default Scratch Org</li>
				<li>SFDX: Create Lightning Web Component</li>
				<li>SFDX: Push Source to Default Scratch Org</li>
				<li>SFDX: Open Default Org</li>
				<li><code>git add .</code></li>
				<li><code>git commit -m "Completes {{BranchName}}. "</code></li>
				<li><code>git push origin {{feature/branch-name}}</code></li>
				<li><code>git checkout master</code></li>
				<li><code>sfdx force:org:delete -u {{BranchName}}</code></li>
			</ol>

			<h2>Deployment</h2>

			<p>Follow https://trailhead.salesforce.com/content/learn/modules/sfdx_app_dev/sfdx_app_dev_deploy</p>

		`
	},
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
