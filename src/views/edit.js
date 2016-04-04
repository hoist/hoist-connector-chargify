/* globals UI */

var C = UI.Views.Connector;

class EditForm extends C.View {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    if (!props.connector) {
      this.state.mode = 'connect';
    }
  }
  render() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <C.Column type="notes">
          <h1>Adding a Chargify Connector</h1>
          <ol>
            <li>Log in to <a href="https://app.chargify.com/login.html">https://app.chargify.com/login.html</a></li>
            <li>Click the <strong>'API access'</strong> tab</li>
            <li>Click <strong>'Enable API Access'</strong></li>
            <li>It will return a page with 'Your current API Key'. Copy the <strong>'API Key'</strong> into the boxes on this page.</li>
            <li>Click <strong>'Save and Verify'</strong></li>
          </ol>
          </C.Column>
          <C.Column>
            <form onChange={(evt) => {
              this.props.updateField(evt);
            }} onSubmit={(evt) => {
              this.props.updateSettings(evt);
            }}>
              <UI.FormElements.Input inactive={!!(this.props.connectorInstance)} placeholder="Key" name="key" label="Key" type="text" value={this.props._key}/>
              <UI.FormElements.Input placeholder="API Key" name="apiKey" label="API Key" type="text" value={this.props.settings.apiKey}/>
              <UI.FormElements.Input placeholder="Subdomain Name" name="subdomain" label="Subdomain Name" type="text" value={this.props.settings.subdomain}/>
              <UI.FormElements.Button
                loading={this.props.saving}
                text={this.props.connectorInstance ? 'Save' : 'Create'}
                type="large"
                submit={true}
                onClick={this.props.updateSettings} />
            </form>
          </C.Column>
        </C.Panel>
      </C.Page>
    );
  }
}

export default EditForm;
global.EditForm = EditForm;
