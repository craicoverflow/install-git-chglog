# install-git-chglog

This action installs [git-chglog](https://pkg.go.dev/github.com/git-chglog/git-chglog?utm_source=godoc) and adds it to your PATH.

## Usage

See [action.yaml](https://github.com/actions/setup-go/blob/main/action.yml)

Basic:

```yaml
steps:
- uses: actions/install-git-chglog@v1
- run: git-chglog -o CHANGELOG.md
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

## Contributions

Are welcome.

## Limitations

This will only run on `ubuntu`, so there is no point in passing anything to `runs-on`. I did not see a need to add this, but if you have this use case please reach out via an issue or PR.