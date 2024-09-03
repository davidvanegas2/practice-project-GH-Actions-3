const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1) Get the inputs
    const bucket = core.getInput('bucket-name', { required: true });
    const region = core.getInput('region', { required: true });
    const dist_folder = core.getInput('dist-folder', { required: true });

    // 2) Sync the files to the S3 bucket
    exec.exec(`aws s3 sync ${dist_folder} s3://${bucket} --region ${region}`)
        .then(r => {
            core.notice('Files synced to S3 bucket');
        }).catch(e => {
            core.setFailed(e);
        }
    );

    core.notice('Hello, World!');
}

run();
