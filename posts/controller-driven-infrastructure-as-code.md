<p class="post-date">February 24, 2025</p>
<h2>Controller-Driven Infrastructure as Code</h2>
<h3>Harnessing the Kubernetes Resource Model for modern infrastructure management</h3>

Infrastructure as Code (IaC) revolutionized how we manage infrastructure,
enabling developers to define resources declaratively and automate their
deployment. However, tools like Terraform and CloudFormation, despite their
declarative configuration, rely on an _operation-centric model_, where
resources are created or updated through one-shot commands.

#### The evolution of IaC: From operations to controllers

In contrast, Kubernetes introduced a new paradigm with its
<a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank">controller pattern</a>
and the
<a href="https://github.com/kubernetes/design-proposals-archive/blob/main/architecture/resource-management.md" target="_blank">Kubernetes Resource Model</a>
(KRM). This _resource-centric_ approach to APIs redefines infrastructure
management by focusing on desired state rather than discrete operations.
Kubernetes controllers continuously monitor resources, ensuring they conform to
their declarative configurations by performing actions to move the actual state
closer to the desired state, much like a human operator would. This is known as
a _control loop_.

Kubernetes also demonstrated the value of providing architectural building
blocks that encapsulate standard patterns, such as a
<a href="https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/" target="_blank">Deployment</a>.
These can then be composed and combined to provide impressive capabilities with
little effort—<a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/" target="_blank">HorizontalPodAutoscaler</a>
is an example of this. Through extensibility, Kubernetes allows developers to
define new resource types and controllers, making it a natural fit for managing
not just application workloads but infrastructure of _any_ kind. This enables
you to actually provide a clean API for common architectural needs that
encapsulates a lot of routine business logic. Extending this model to IaC is
something we call _Controller-Driven IaC_.

#### Controller-driven IaC

Controller-Driven IaC builds upon the Kubernetes foundation, leveraging its
controllers to reconcile cloud resources and maintain continuous alignment
between desired and actual states. By extending Kubernetes' principles of
declarative configuration and control loops to IaC, this approach offers a
resilient and scalable way to manage modern infrastructure. Integrating cloud
and external system APIs into Kubernetes controllers enables continuous state
reconciliation beyond Kubernetes itself, ensuring consistency, eliminating
configuration drift, and reducing operational complexity. It results in an IaC
solution that is capable of working correctly with modern, dynamic
infrastructure. Additionally, it brings many of the other benefits of
Kubernetes—such as RBAC, policy enforcement, and observability—to
infrastructure and systems _outside_ the cluster, creating a unified and
flexible management framework. In essence, Kubernetes becomes the control plane
for your entire developer platform. That means you can offer developers a
self-service experience within defined bounds, and this can further be
scoped to specific application domains.

This concept isn't entirely new. Kubernetes introduced
<a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/" target="_blank">Custom Resource Definitions</a>
(CRDs) in 2017, enabling the creation of <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/operator/" target="_blank">Operators</a>,
or custom controllers, to extend its functionality. Today, <a href="https://operatorhub.io" target="_blank">countless Operators exist</a>
to manage diverse applications and infrastructure, both _within_ and _outside
of_ Kubernetes, including those from major cloud providers. For instance, GCP's
<a href="https://cloud.google.com/config-connector/docs/overview" target="_blank">Config Connector</a>,
AWS's <a href="https://github.com/aws-controllers-k8s/community" target="_blank">ACK</a>,
and Azure's <a href="https://azure.github.io/azure-service-operator/" target="_blank">ASO</a>
offer controllers for managing their respective platform's infrastructure.
However, just as operationalizing Kubernetes requires tooling and investment to
build an effective platform, so too does implementing Controller-Driven IaC.
Integrating these various controllers into a cohesive platform requires its own
kind of orchestration. We need a way to _program_ control loops—whether
built-in Kubernetes controllers (like Deployments or Jobs), off-the-shelf
controllers (like ACK or Config Connector), or custom controllers we've built
ourselves.

#### Introducing Koreo: Programming control loops for modern platforms

To address this need and deliver the full potential of Controller-Driven IaC,
we've developed and open-sourced <a href="http://koreo.dev" target="_blank">Koreo</a>,
a platform engineering toolkit for Kubernetes. Koreo is a new approach to
Kubernetes configuration management and resource orchestration empowering
developers through programmable workflows and structured data. It enables
seamless integration and automation around the Kubernetes Resource Model,
supporting a wide range of use cases centered on Controller-Driven IaC. Koreo
serves as a _meta-controller programming language_ and runtime that allows you
to compose control loops into powerful abstractions.

Koreo is specifically built to empower platform engineering teams and DevOps
engineers by allowing them to provide Architecture-as-Code building blocks to
the teams they support. With Koreo, you can easily leverage existing Kubernetes
Operators or create your own specialized Operators, then expose them through
powerful, high-level abstractions aligned with your organization's needs. For
example, you can develop a "StatelessCrudApp" that allows development teams to
enable company-standard databases and caches with minimal effort. Similarly,
you can build flexible automations that combine and orchestrate various
Kubernetes primitives.

Where Koreo really shines, however, is making it fast and safe to add new
capabilities to your internal developer platform. Existing configuration
management tools like Helm and Kustomize, while useful for simpler
configurations, become unwieldy when dealing with the intricacies of modern
Kubernetes deployments. They ultimately treat configuration as static data, and
this becomes problematic as configuration evolves in complexity. Koreo instead
embraces configuration as code by providing a programming language and runtime
with robust developer tooling. This allows platform engineers to define and
manage Kubernetes configurations and resource orchestration in a way that is
better suited to modern infrastructure challenges. It offers a solution that
scales with complexity. A built-in testing framework makes it easy to quickly
validate configuration and iterate on infrastructure, and IDE integration gives
developers real-time feedback, autocomplete, and introspection.

#### The future of infrastructure management is controller-driven

By harnessing the power of Kubernetes controllers for Infrastructure as Code,
Koreo bridges the gap between declarative configuration and dynamic
infrastructure management. It moves beyond the limitations of traditional IaC,
offering a truly Kubernetes-native approach that brings the benefits of control
loops, composability, and continuous reconciliation to your entire platform.
With Koreo, you're not just managing resources; you're building a self-service
platform that empowers developers to innovate within defined boundaries. You're
automating complex workflows, enforcing organizational policies, and ensuring
consistency across your entire infrastructure landscape, all through the power
of Kubernetes controllers and programmable workflows.

See what you can build with <a href="https://koreo.dev" target="_blank">Koreo</a>.
