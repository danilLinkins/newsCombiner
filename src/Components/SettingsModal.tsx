function SettingsModal() {
	return (
		<>
			<input type="checkbox" id="my_modal_7" className="modal-toggle"/>
			<div className="modal" role="dialog">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Hello!</h3>
					<p className="py-4">This modal works with a hidden checkbox!</p>
				</div>
				<label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
			</div>
		</>
	)
}

export default SettingsModal;