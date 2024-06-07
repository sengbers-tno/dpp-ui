<template>
    <div className="card">
        <h4>List available credentials</h4>
        <p>This page contains information about credentials that have been issued to the identities managed by this REO hosting this DPP Data Repository. These credentials may be attached (if required) to templates or instances of DPPs.</p>
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="credentialType" header="Credential Type"></Column>
            <Column field="id" header="ID"></Column>
            <Column field="issuer" header="Issuer"></Column>
            <Column field="validTill" header="Valid Till"></Column>
        </DataTable>
    </div>
</template>
